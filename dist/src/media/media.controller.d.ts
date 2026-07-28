import { MediaService } from './media.service';
export declare class MediaController {
    private svc;
    constructor(svc: MediaService);
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
    upload(file: Express.Multer.File): Promise<{
        url: string;
        filename: string;
    }>;
    presign(body: {
        filename: string;
        contentType: string;
    }): Promise<{
        uploadUrl: string;
        key: string;
        publicUrl: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
