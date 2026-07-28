import { PrismaService } from '../prisma/prisma.service';
export declare class CreateCategoryDto {
    name: string;
    nameEn: string;
    slug: string;
}
export declare class UpdateCategoryDto {
    name?: string;
    nameEn?: string;
    slug?: string;
}
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        _count: {
            posts: number;
        };
    } & {
        id: string;
        name: string;
        slug: string;
        nameEn: string;
    })[]>;
    findOne(id: string): Promise<{
        _count: {
            posts: number;
        };
    } & {
        id: string;
        name: string;
        slug: string;
        nameEn: string;
    }>;
    create(dto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        slug: string;
        nameEn: string;
    }>;
    update(id: string, dto: UpdateCategoryDto): Promise<{
        id: string;
        name: string;
        slug: string;
        nameEn: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
