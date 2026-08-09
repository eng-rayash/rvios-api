import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto, PostQueryDto } from './dto/post.dto';
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsService);
    findPublished(query: PostQueryDto): Promise<{
        data: ({
            category: {
                name: string;
                id: string;
                nameEn: string;
                slug: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            title: string;
            titleEn: string | null;
            description: string;
            content: string;
            metaDescription: string;
            keywords: string[];
            tags: string[];
            heroImageUrl: string | null;
            heroImageAlt: string | null;
            readingTime: number;
            status: import("@prisma/client").$Enums.PostStatus;
            featured: boolean;
            views: number;
            categoryId: string;
            publishedAt: Date | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findBySlug(slug: string): Promise<{
        category: {
            name: string;
            id: string;
            nameEn: string;
            slug: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        titleEn: string | null;
        description: string;
        content: string;
        metaDescription: string;
        keywords: string[];
        tags: string[];
        heroImageUrl: string | null;
        heroImageAlt: string | null;
        readingTime: number;
        status: import("@prisma/client").$Enums.PostStatus;
        featured: boolean;
        views: number;
        categoryId: string;
        publishedAt: Date | null;
    }>;
    findAll(query: PostQueryDto): Promise<{
        data: ({
            category: {
                name: string;
                id: string;
                slug: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            title: string;
            titleEn: string | null;
            description: string;
            content: string;
            metaDescription: string;
            keywords: string[];
            tags: string[];
            heroImageUrl: string | null;
            heroImageAlt: string | null;
            readingTime: number;
            status: import("@prisma/client").$Enums.PostStatus;
            featured: boolean;
            views: number;
            categoryId: string;
            publishedAt: Date | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        category: {
            name: string;
            id: string;
            nameEn: string;
            slug: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        titleEn: string | null;
        description: string;
        content: string;
        metaDescription: string;
        keywords: string[];
        tags: string[];
        heroImageUrl: string | null;
        heroImageAlt: string | null;
        readingTime: number;
        status: import("@prisma/client").$Enums.PostStatus;
        featured: boolean;
        views: number;
        categoryId: string;
        publishedAt: Date | null;
    }>;
    create(dto: CreatePostDto): Promise<{
        category: {
            name: string;
            id: string;
            nameEn: string;
            slug: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        titleEn: string | null;
        description: string;
        content: string;
        metaDescription: string;
        keywords: string[];
        tags: string[];
        heroImageUrl: string | null;
        heroImageAlt: string | null;
        readingTime: number;
        status: import("@prisma/client").$Enums.PostStatus;
        featured: boolean;
        views: number;
        categoryId: string;
        publishedAt: Date | null;
    }>;
    update(id: string, dto: UpdatePostDto): Promise<{
        category: {
            name: string;
            id: string;
            nameEn: string;
            slug: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        titleEn: string | null;
        description: string;
        content: string;
        metaDescription: string;
        keywords: string[];
        tags: string[];
        heroImageUrl: string | null;
        heroImageAlt: string | null;
        readingTime: number;
        status: import("@prisma/client").$Enums.PostStatus;
        featured: boolean;
        views: number;
        categoryId: string;
        publishedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
