import { ServiceStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class CreateServiceDto {
    title: string;
    titleEn: string;
    slug: string;
    description: string;
    descriptionEn: string;
    icon?: string;
    features?: string[];
    order?: number;
    status?: ServiceStatus;
}
export declare class UpdateServiceDto {
    title?: string;
    titleEn?: string;
    slug?: string;
    description?: string;
    descriptionEn?: string;
    icon?: string;
    features?: string[];
    order?: number;
    status?: ServiceStatus;
}
export declare class ServicesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(activeOnly?: boolean): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        titleEn: string;
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
        slug: string;
        title: string;
        titleEn: string;
        description: string;
        status: import("@prisma/client").$Enums.ServiceStatus;
        descriptionEn: string;
        icon: string | null;
        features: string[];
        order: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        titleEn: string;
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
        slug: string;
        title: string;
        titleEn: string;
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
        slug: string;
        title: string;
        titleEn: string;
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
