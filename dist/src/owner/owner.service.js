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
exports.OwnerService = exports.UpdateOwnerProfileDto = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const class_validator_1 = require("class-validator");
class UpdateOwnerProfileDto {
}
exports.UpdateOwnerProfileDto = UpdateOwnerProfileDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOwnerProfileDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOwnerProfileDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOwnerProfileDto.prototype, "titleEn", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOwnerProfileDto.prototype, "bio", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOwnerProfileDto.prototype, "bioEn", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOwnerProfileDto.prototype, "avatarUrl", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateOwnerProfileDto.prototype, "skills", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateOwnerProfileDto.prototype, "links", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOwnerProfileDto.prototype, "resumeUrl", void 0);
let OwnerService = class OwnerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile() {
        const profile = await this.prisma.ownerProfile.findFirst();
        if (!profile)
            throw new common_1.NotFoundException('الملف الشخصي غير موجود');
        return profile;
    }
    async updateProfile(dto) {
        const existing = await this.prisma.ownerProfile.findFirst();
        if (existing) {
            return this.prisma.ownerProfile.update({
                where: { id: existing.id },
                data: {
                    ...dto,
                    links: dto.links ? dto.links : undefined,
                },
            });
        }
        return this.prisma.ownerProfile.create({
            data: {
                name: dto.name ?? '',
                title: dto.title ?? '',
                titleEn: dto.titleEn ?? '',
                bio: dto.bio ?? '',
                bioEn: dto.bioEn ?? '',
                skills: dto.skills ?? [],
                links: (dto.links ?? {}),
                avatarUrl: dto.avatarUrl,
                resumeUrl: dto.resumeUrl,
            },
        });
    }
};
exports.OwnerService = OwnerService;
exports.OwnerService = OwnerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OwnerService);
//# sourceMappingURL=owner.service.js.map