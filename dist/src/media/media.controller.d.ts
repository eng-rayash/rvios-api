import { MediaService } from './media.service';
import { PresignDto } from './dto/presign.dto';
export declare class MediaController {
    private svc;
    constructor(svc: MediaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        type: import("@prisma/client").$Enums.MediaType;
        id: string;
        url: string;
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        uploadedAt: Date;
    }[]>;
    upload(file: Express.Multer.File): Promise<{
        url: string;
        filename: string;
    }>;
    presign(dto: PresignDto): Promise<{
        uploadUrl: string;
        key: string;
        publicUrl: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
