import { PostStatus } from '@prisma/client';
export declare class CreatePostDto {
    title: string;
    titleEn?: string;
    slug: string;
    description: string;
    content: string;
    metaDescription: string;
    keywords?: string[];
    tags?: string[];
    heroImageUrl?: string;
    heroImageAlt?: string;
    readingTime?: number;
    status?: PostStatus;
    featured?: boolean;
    categoryId: string;
}
export declare class UpdatePostDto {
    title?: string;
    titleEn?: string;
    slug?: string;
    description?: string;
    content?: string;
    metaDescription?: string;
    keywords?: string[];
    tags?: string[];
    heroImageUrl?: string;
    heroImageAlt?: string;
    readingTime?: number;
    status?: PostStatus;
    featured?: boolean;
    categoryId?: string;
}
export declare class PostQueryDto {
    search?: string;
    status?: PostStatus;
    categorySlug?: string;
    featured?: boolean;
    page?: number;
    limit?: number;
}
