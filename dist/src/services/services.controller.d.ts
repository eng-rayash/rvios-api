import { ServicesService, CreateServiceDto, UpdateServiceDto } from './services.service';
export declare class ServicesController {
    private svc;
    constructor(svc: ServicesService);
    findPublic(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        titleEn: string;
        slug: string;
        description: string;
        status: import("@prisma/client").$Enums.ServiceStatus;
        descriptionEn: string;
        icon: string | null;
        features: string[];
        order: number;
    }[]>;
    findBySlug(slug: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        titleEn: string;
        slug: string;
        description: string;
        status: import("@prisma/client").$Enums.ServiceStatus;
        descriptionEn: string;
        icon: string | null;
        features: string[];
        order: number;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        titleEn: string;
        slug: string;
        description: string;
        status: import("@prisma/client").$Enums.ServiceStatus;
        descriptionEn: string;
        icon: string | null;
        features: string[];
        order: number;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        titleEn: string;
        slug: string;
        description: string;
        status: import("@prisma/client").$Enums.ServiceStatus;
        descriptionEn: string;
        icon: string | null;
        features: string[];
        order: number;
    }>;
    create(dto: CreateServiceDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        titleEn: string;
        slug: string;
        description: string;
        status: import("@prisma/client").$Enums.ServiceStatus;
        descriptionEn: string;
        icon: string | null;
        features: string[];
        order: number;
    }>;
    update(id: string, dto: UpdateServiceDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        titleEn: string;
        slug: string;
        description: string;
        status: import("@prisma/client").$Enums.ServiceStatus;
        descriptionEn: string;
        icon: string | null;
        features: string[];
        order: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
