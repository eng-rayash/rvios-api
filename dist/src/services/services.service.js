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
exports.ServicesService = exports.UpdateServiceDto = exports.CreateServiceDto = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const class_validator_1 = require("class-validator");
class CreateServiceDto {
}
exports.CreateServiceDto = CreateServiceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "titleEn", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "descriptionEn", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "icon", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateServiceDto.prototype, "features", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.ServiceStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "status", void 0);
class UpdateServiceDto {
}
exports.UpdateServiceDto = UpdateServiceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "titleEn", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "descriptionEn", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "icon", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateServiceDto.prototype, "features", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateServiceDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.ServiceStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "status", void 0);
let ServicesService = class ServicesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(activeOnly = false) {
        return this.prisma.service.findMany({
            where: activeOnly ? { status: client_1.ServiceStatus.ACTIVE } : undefined,
            orderBy: { order: 'asc' },
        });
    }
    async findBySlug(slug) {
        const svc = await this.prisma.service.findUnique({ where: { slug } });
        if (!svc)
            throw new common_1.NotFoundException('الخدمة غير موجودة');
        return svc;
    }
    async findOne(id) {
        const svc = await this.prisma.service.findUnique({ where: { id } });
        if (!svc)
            throw new common_1.NotFoundException('الخدمة غير موجودة');
        return svc;
    }
    async create(dto) {
        const exists = await this.prisma.service.findUnique({ where: { slug: dto.slug } });
        if (exists)
            throw new common_1.ConflictException('الرابط مستخدم');
        return this.prisma.service.create({ data: { ...dto, features: dto.features ?? [] } });
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.service.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.service.delete({ where: { id } });
        return { message: 'تم حذف الخدمة' };
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServicesService);
//# sourceMappingURL=services.service.js.map