import { CategoriesService, CreateCategoryDto, UpdateCategoryDto } from './categories.service';
export declare class CategoriesController {
    private svc;
    constructor(svc: CategoriesService);
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
