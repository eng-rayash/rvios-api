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
        name: string;
        id: string;
        nameEn: string;
        slug: string;
    })[]>;
    findOne(id: string): Promise<{
        _count: {
            posts: number;
        };
    } & {
        name: string;
        id: string;
        nameEn: string;
        slug: string;
    }>;
    create(dto: CreateCategoryDto): Promise<{
        name: string;
        id: string;
        nameEn: string;
        slug: string;
    }>;
    update(id: string, dto: UpdateCategoryDto): Promise<{
        name: string;
        id: string;
        nameEn: string;
        slug: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
