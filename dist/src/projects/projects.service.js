"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const CARD_SELECT = {
    id: true, slug: true, title: true, summary: true,
    client: true, industry: true, year: true,
    coverImageUrl: true, coverImageAlt: true, coverBlurHash: true,
    technologies: true, featured: true, order: true, publishedAt: true, views: true,
    category: { select: { id: true, name: true, slug: true } },
    metrics: {
        take: 1,
        orderBy: { order: 'asc' },
        select: { label: true, value: true, unit: true, direction: true },
    },
};
const DETAIL_INCLUDE = {
    category: true,
    gallery: { orderBy: { order: 'asc' } },
    metrics: { orderBy: { order: 'asc' } },
    services: { include: { service: { select: { id: true, title: true, slug: true } } } },
};
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.publicWhere = {
            status: client_1.ProjectStatus.PUBLISHED,
        };
    }
    async findPublic(q) {
        const where = {
            ...this.publicWhere,
            ...(q.category && { category: { slug: q.category } }),
            ...(q.service && { services: { some: { service: { slug: q.service } } } }),
            ...(q.tech && { technologies: { has: q.tech } }),
            ...(q.industry && { industry: q.industry }),
            ...(q.year && { year: q.year }),
            ...(q.featured !== undefined && { featured: q.featured }),
            ...(q.search && {
                OR: [
                    { title: { contains: q.search, mode: 'insensitive' } },
                    { summary: { contains: q.search, mode: 'insensitive' } },
                    { client: { contains: q.search, mode: 'insensitive' } },
                ],
            }),
        };
        const [data, total] = await Promise.all([
            this.prisma.project.findMany({
                where,
                select: CARD_SELECT,
                orderBy: [{ [q.sort]: q.order }, { id: 'asc' }],
                skip: q.skip,
                take: q.limit,
            }),
            this.prisma.project.count({ where }),
        ]);
        return (0, pagination_dto_1.paginate)(data, total, { page: q.page, limit: q.limit });
    }
    async filters() {
        const [categories, industries, years, projects] = await Promise.all([
            this.prisma.projectCategory.findMany({
                orderBy: { order: 'asc' },
                select: {
                    id: true, name: true, slug: true,
                    _count: { select: { projects: { where: this.publicWhere } } },
                },
            }),
            this.prisma.project.groupBy({
                by: ['industry'],
                where: { ...this.publicWhere, industry: { not: null } },
                _count: { industry: true },
            }),
            this.prisma.project.groupBy({
                by: ['year'],
                where: { ...this.publicWhere, year: { not: null } },
                _count: { year: true },
                orderBy: { year: 'desc' },
            }),
            this.prisma.project.findMany({
                where: this.publicWhere,
                select: { technologies: true },
            }),
        ]);
        const techCount = new Map();
        for (const p of projects) {
            for (const t of p.technologies)
                techCount.set(t, (techCount.get(t) ?? 0) + 1);
        }
        return {
            categories: categories
                .filter((c) => c._count.projects > 0)
                .map(({ _count, ...c }) => ({ ...c, count: _count.projects })),
            industries: industries.map((i) => ({
                value: i.industry,
                count: i._count.industry,
            })),
            years: years.map((y) => ({ value: y.year, count: y._count.year })),
            technologies: [...techCount.entries()]
                .sort((a, b) => b[1] - a[1])
                .slice(0, 20)
                .map(([value, count]) => ({ value, count })),
        };
    }
    slugs() {
        return this.prisma.project.findMany({
            where: this.publicWhere,
            select: { slug: true, updatedAt: true },
            orderBy: { publishedAt: 'desc' },
        });
    }
    async findBySlug(slug) {
        const project = await this.prisma.project.findFirst({
            where: { slug, ...this.publicWhere },
            include: DETAIL_INCLUDE,
        });
        if (!project)
            throw new common_1.NotFoundException('المشروع غير موجود');
        this.prisma.project
            .update({ where: { id: project.id }, data: { views: { increment: 1 } } })
            .catch(() => undefined);
        const [related, neighbours] = await Promise.all([
            this.prisma.project.findMany({
                where: {
                    ...this.publicWhere,
                    id: { not: project.id },
                    ...(project.categoryId && { categoryId: project.categoryId }),
                },
                select: CARD_SELECT,
                take: 3,
                orderBy: { order: 'asc' },
            }),
            this.neighbours(project.order, project.id),
        ]);
        return { ...project, related, ...neighbours };
    }
    async neighbours(order, id) {
        const pick = { slug: true, title: true, coverImageUrl: true };
        const [prev, next] = await Promise.all([
            this.prisma.project.findFirst({
                where: { ...this.publicWhere, id: { not: id }, order: { lt: order } },
                orderBy: { order: 'desc' },
                select: pick,
            }),
            this.prisma.project.findFirst({
                where: { ...this.publicWhere, id: { not: id }, order: { gt: order } },
                orderBy: { order: 'asc' },
                select: pick,
            }),
        ]);
        return { prev, next };
    }
    async findAllAdmin(q) {
        const where = {
            ...(q.search && { title: { contains: q.search, mode: 'insensitive' } }),
        };
        const [data, total] = await Promise.all([
            this.prisma.project.findMany({
                where,
                select: { ...CARD_SELECT, status: true, createdAt: true },
                orderBy: [{ [q.sort]: q.order }, { id: 'asc' }],
                skip: q.skip,
                take: q.limit,
            }),
            this.prisma.project.count({ where }),
        ]);
        return (0, pagination_dto_1.paginate)(data, total, { page: q.page, limit: q.limit });
    }
    async findOne(id) {
        const project = await this.prisma.project.findUnique({
            where: { id },
            include: DETAIL_INCLUDE,
        });
        if (!project)
            throw new common_1.NotFoundException('المشروع غير موجود');
        return project;
    }
    async create(dto) {
        const { metrics, serviceIds, approach, ...rest } = dto;
        return this.prisma.project.create({
            data: {
                ...rest,
                approach: (approach ?? []),
                technologies: dto.technologies ?? [],
                ...(metrics?.length && {
                    metrics: {
                        create: metrics.map((m, i) => ({ ...m, order: m.order ?? i })),
                    },
                }),
                ...(serviceIds?.length && {
                    services: { create: serviceIds.map((serviceId) => ({ serviceId })) },
                }),
                ...(dto.status === client_1.ProjectStatus.PUBLISHED && { publishedAt: new Date() }),
            },
            include: DETAIL_INCLUDE,
        });
    }
    async update(id, dto) {
        const current = await this.prisma.project.findUnique({
            where: { id },
            select: { id: true, publishedAt: true },
        });
        if (!current)
            throw new common_1.NotFoundException('المشروع غير موجود');
        const { metrics, serviceIds, approach, ...rest } = dto;
        return this.prisma.$transaction(async (tx) => {
            if (metrics) {
                await tx.projectMetric.deleteMany({ where: { projectId: id } });
                if (metrics.length) {
                    await tx.projectMetric.createMany({
                        data: metrics.map((m, i) => ({ ...m, projectId: id, order: m.order ?? i })),
                    });
                }
            }
            if (serviceIds) {
                await tx.projectService.deleteMany({ where: { projectId: id } });
                if (serviceIds.length) {
                    await tx.projectService.createMany({
                        data: serviceIds.map((serviceId) => ({ projectId: id, serviceId })),
                    });
                }
            }
            return tx.project.update({
                where: { id },
                data: {
                    ...rest,
                    ...(approach && { approach: approach }),
                    ...(dto.status === client_1.ProjectStatus.PUBLISHED &&
                        !current.publishedAt && { publishedAt: new Date() }),
                },
                include: DETAIL_INCLUDE,
            });
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.project.delete({ where: { id } });
        return { message: 'تم حذف المشروع' };
    }
    async publish(id) {
        const p = await this.prisma.project.findUnique({
            where: { id },
            include: { metrics: true },
        });
        if (!p)
            throw new common_1.NotFoundException('المشروع غير موجود');
        const missing = [];
        if (!p.coverImageUrl)
            missing.push('صورة الغلاف');
        if (!p.summary)
            missing.push('الملخّص');
        if (!p.challenge)
            missing.push('التحدّي');
        if (!p.solution)
            missing.push('الحل');
        if (!p.metrics.length)
            missing.push('مؤشّر نتائج واحد على الأقل');
        if (missing.length) {
            throw new common_1.UnprocessableEntityException({
                message: 'لا يمكن النشر — حقول ناقصة',
                missing,
            });
        }
        return this.prisma.project.update({
            where: { id },
            data: {
                status: client_1.ProjectStatus.PUBLISHED,
                publishedAt: p.publishedAt ?? new Date(),
            },
        });
    }
    async unpublish(id) {
        await this.findOne(id);
        return this.prisma.project.update({
            where: { id },
            data: { status: client_1.ProjectStatus.DRAFT },
        });
    }
    async addImages(projectId, images) {
        await this.findOne(projectId);
        const max = await this.prisma.projectImage.aggregate({
            where: { projectId },
            _max: { order: true },
        });
        const base = (max._max.order ?? -1) + 1;
        await this.prisma.projectImage.createMany({
            data: images.map((img, i) => ({
                ...img,
                projectId,
                order: img.order ?? base + i,
            })),
        });
        return this.prisma.projectImage.findMany({
            where: { projectId },
            orderBy: { order: 'asc' },
        });
    }
    async removeImage(id) {
        const img = await this.prisma.projectImage.findUnique({ where: { id } });
        if (!img)
            throw new common_1.NotFoundException('الصورة غير موجودة');
        await this.prisma.projectImage.delete({ where: { id } });
        return { message: 'تم حذف الصورة', url: img.url };
    }
    async reorder(items, table) {
        await this.prisma.$transaction(items.map((i) => table === 'project'
            ? this.prisma.project.update({ where: { id: i.id }, data: { order: i.order } })
            : this.prisma.projectImage.update({ where: { id: i.id }, data: { order: i.order } })));
        return { message: 'تم حفظ الترتيب', count: items.length };
    }
    categories() {
        return this.prisma.projectCategory.findMany({ orderBy: { order: 'asc' } });
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map