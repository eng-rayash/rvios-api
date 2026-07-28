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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const uuid_1 = require("uuid");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let MediaService = class MediaService {
    constructor(config, prisma) {
        this.config = config;
        this.prisma = prisma;
        const accountId = this.config.get('cloudflare.accountId');
        this.bucket = this.config.get('cloudflare.bucketName') ?? 'rvios-media';
        this.publicUrl = this.config.get('cloudflare.publicUrl') ?? '';
        this.s3 = new client_s3_1.S3Client({
            region: 'auto',
            endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: this.config.get('cloudflare.accessKeyId') ?? '',
                secretAccessKey: this.config.get('cloudflare.secretAccessKey') ?? '',
            },
        });
    }
    async upload(file) {
        const ext = file.originalname.split('.').pop();
        const filename = `${(0, uuid_1.v4)()}.${ext}`;
        const key = `uploads/${filename}`;
        try {
            await this.s3.send(new client_s3_1.PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            }));
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('فشل رفع الملف إلى Cloudflare R2');
        }
        const url = `${this.publicUrl}/${key}`;
        const mediaType = this.detectType(file.mimetype);
        await this.prisma.media.create({
            data: {
                url,
                filename: key,
                originalName: file.originalname,
                mimeType: file.mimetype,
                size: file.size,
                type: mediaType,
            },
        });
        return { url, filename: key };
    }
    async getPresignedUrl(filename, contentType) {
        const ext = filename.split('.').pop();
        const key = `uploads/${(0, uuid_1.v4)()}.${ext}`;
        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            ContentType: contentType,
        }), { expiresIn: 300 });
        return { uploadUrl: url, key, publicUrl: `${this.publicUrl}/${key}` };
    }
    findAll() {
        return this.prisma.media.findMany({ orderBy: { uploadedAt: 'desc' } });
    }
    async remove(id) {
        const media = await this.prisma.media.findUnique({ where: { id } });
        if (!media)
            return { message: 'الملف غير موجود' };
        try {
            await this.s3.send(new client_s3_1.DeleteObjectCommand({ Bucket: this.bucket, Key: media.filename }));
        }
        catch (_) {
        }
        await this.prisma.media.delete({ where: { id } });
        return { message: 'تم حذف الملف' };
    }
    detectType(mimeType) {
        if (mimeType.startsWith('image/'))
            return client_1.MediaType.IMAGE;
        if (mimeType.startsWith('video/'))
            return client_1.MediaType.VIDEO;
        return client_1.MediaType.DOCUMENT;
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], MediaService);
//# sourceMappingURL=media.service.js.map