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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const passport_1 = require("@nestjs/passport");
const multer_1 = require("multer");
const client_1 = require("@prisma/client");
const media_service_1 = require("./media.service");
const presign_dto_1 = require("./dto/presign.dto");
const allowed_mime_1 = require("./allowed-mime");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
let MediaController = class MediaController {
    constructor(svc) {
        this.svc = svc;
    }
    findAll() { return this.svc.findAll(); }
    upload(file) {
        return this.svc.upload(file);
    }
    presign(dto) {
        return this.svc.getPresignedUrl(dto.filename, dto.contentType);
    }
    remove(id) { return this.svc.remove(id); }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: allowed_mime_1.MAX_UPLOAD_SIZE },
        fileFilter: (_req, file, cb) => {
            if (allowed_mime_1.ALLOWED_MIME.includes(file.mimetype))
                cb(null, true);
            else
                cb(new Error('نوع الملف غير مدعوم'), false);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "upload", null);
__decorate([
    (0, common_1.Post)('presign'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [presign_dto_1.PresignDto]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "presign", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "remove", null);
exports.MediaController = MediaController = __decorate([
    (0, common_1.Controller)('media'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.EDITOR),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);
//# sourceMappingURL=media.controller.js.map