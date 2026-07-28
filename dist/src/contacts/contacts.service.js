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
exports.ContactsService = exports.UpdateContactStatusDto = exports.CreateContactDto = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const class_validator_1 = require("class-validator");
class CreateContactDto {
}
exports.CreateContactDto = CreateContactDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateContactDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "service", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], CreateContactDto.prototype, "message", void 0);
class UpdateContactStatusDto {
}
exports.UpdateContactStatusDto = UpdateContactStatusDto;
__decorate([
    (0, class_validator_1.IsEnum)(client_1.ContactStatus),
    __metadata("design:type", String)
], UpdateContactStatusDto.prototype, "status", void 0);
let ContactsService = class ContactsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.contact.findMany({ orderBy: { createdAt: 'desc' } });
    }
    async findOne(id) {
        const c = await this.prisma.contact.findUnique({ where: { id } });
        if (!c)
            throw new common_1.NotFoundException('الرسالة غير موجودة');
        return c;
    }
    create(dto) {
        return this.prisma.contact.create({ data: dto });
    }
    async updateStatus(id, dto) {
        await this.findOne(id);
        return this.prisma.contact.update({ where: { id }, data: { status: dto.status } });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.contact.delete({ where: { id } });
        return { message: 'تم حذف الرسالة' };
    }
    stats() {
        return this.prisma.contact.groupBy({
            by: ['status'],
            _count: { status: true },
        });
    }
};
exports.ContactsService = ContactsService;
exports.ContactsService = ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContactsService);
//# sourceMappingURL=contacts.service.js.map