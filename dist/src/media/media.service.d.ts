import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
export declare class MediaService {
    private config;
    private prisma;
    private s3;
    private bucket;
    private publicUrl;
    constructor(config: ConfigService, prisma: PrismaService);
    upload(file: Express.Multer.File): Promise<{
        url: string;
        filename: string;
    }>;
    getPresignedUrl(filename: string, contentType: string): Promise<{
        uploadUrl: string;
        key: string;
        publicUrl: string;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        url: string;
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        type: import("@prisma/client").$Enums.MediaType;
        uploadedAt: Date;
    }[]>;
    remove(id: string): Promise<{
        message: string;
    }>;
    private detectType;
}
