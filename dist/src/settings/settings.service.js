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
exports.SettingsService = exports.UpdateSettingDto = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const class_validator_1 = require("class-validator");
class UpdateSettingDto {
}
exports.UpdateSettingDto = UpdateSettingDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingDto.prototype, "value", void 0);
let SettingsService = class SettingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() { return this.prisma.setting.findMany({ orderBy: { key: 'asc' } }); }
    async findByKey(key) {
        const s = await this.prisma.setting.findUnique({ where: { key } });
        if (!s)
            throw new common_1.NotFoundException(`الإعداد '${key}' غير موجود`);
        return s;
    }
    async update(key, dto) {
        await this.findByKey(key);
        return this.prisma.setting.update({ where: { key }, data: { value: dto.value } });
    }
    async bulkUpdate(settings) {
        return Promise.all(settings.map((s) => this.prisma.setting.upsert({
            where: { key: s.key },
            update: { value: s.value },
            create: { key: s.key, value: s.value, type: 'STRING' },
        })));
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SettingsService);
//# sourceMappingURL=settings.service.js.map