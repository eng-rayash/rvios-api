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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let PostsService = class PostsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findPublished(query) {
        const { page = 1, limit = 10, search, categorySlug, featured } = query;
        const skip = (page - 1) * limit;
        const where = {
            status: client_1.PostStatus.PUBLISHED,
            ...(search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            }),
            ...(categorySlug && { category: { slug: categorySlug } }),
            ...(featured !== undefined && { featured }),
        };
        const [data, total] = await Promise.all([
            this.prisma.post.findMany({
                where,
                include: { category: true },
                orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
                skip,
                take: limit,
            }),
            this.prisma.post.count({ where }),
        ]);
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findBySlug(slug) {
        const post = await this.prisma.post.findUnique({
            where: { slug },
            include: { category: true },
        });
        if (!post || post.status !== client_1.PostStatus.PUBLISHED) {
            throw new common_1.NotFoundException('المقال غير موجود');
        }
        await this.prisma.post.update({ where: { slug }, data: { views: { increment: 1 } } });
        return post;
    }
    async findAll(query) {
        const { page = 1, limit = 20, search, status, categorySlug } = query;
        const skip = (page - 1) * limit;
        const where = {
            ...(status && { status }),
            ...(search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { slug: { contains: search, mode: 'insensitive' } },
                ],
            }),
            ...(categorySlug && { category: { slug: categorySlug } }),
        };
        const [data, total] = await Promise.all([
            this.prisma.post.findMany({
                where,
                include: { category: { select: { id: true, name: true, slug: true } } },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.post.count({ where }),
        ]);
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    async findOne(id) {
        const post = await this.prisma.post.findUnique({
            where: { id },
            include: { category: true },
        });
        if (!post)
            throw new common_1.NotFoundException('المقال غير موجود');
        return post;
    }
    async create(dto) {
        const existing = await this.prisma.post.findUnique({ where: { slug: dto.slug } });
        if (existing)
            throw new common_1.ConflictException('الرابط (slug) مستخدم بالفعل');
        return this.prisma.post.create({
            data: {
                ...dto,
                keywords: dto.keywords ?? [],
                tags: dto.tags ?? [],
                publishedAt: dto.status === client_1.PostStatus.PUBLISHED ? new Date() : null,
            },
            include: { category: true },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        const data = { ...dto };
        if (dto.status === client_1.PostStatus.PUBLISHED) {
            const current = await this.findOne(id);
            if (!current.publishedAt)
                data.publishedAt = new Date();
        }
        return this.prisma.post.update({ where: { id }, data, include: { category: true } });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.post.delete({ where: { id } });
        return { message: 'تم حذف المقال' };
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map