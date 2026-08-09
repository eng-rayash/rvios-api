import { CategoriesService, CreateCategoryDto, UpdateCategoryDto } from './categories.service';
export declare class CategoriesController {
    private svc;
    constructor(svc: CategoriesService);
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
