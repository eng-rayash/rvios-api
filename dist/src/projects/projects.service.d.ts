import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { type Paginated } from '../common/dto/pagination.dto';
import type { QueryProjectsDto } from './dto/query-projects.dto';
import type { CreateProjectDto, ProjectImageDto, ReorderItemDto, UpdateProjectDto } from './dto/project.dto';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    private readonly publicWhere;
    findPublic(q: QueryProjectsDto): Promise<Paginated<unknown>>;
    filters(): Promise<{
        categories: {
            count: number;
            name: string;
            id: string;
            slug: string;
        }[];
        industries: {
            value: string;
            count: number;
        }[];
        years: {
            value: number;
            count: number;
        }[];
        technologies: {
            value: string;
            count: number;
        }[];
    }>;
    slugs(): Prisma.PrismaPromise<{
        updatedAt: Date;
        slug: string;
    }[]>;
    findBySlug(slug: string): Promise<{
        prev: {
            slug: string;
            title: string;
            coverImageUrl: string | null;
        } | null;
        next: {
            slug: string;
            title: string;
            coverImageUrl: string | null;
        } | null;
        related: {
            category: {
                name: string;
                id: string;
                slug: string;
            } | null;
            client: string | null;
            id: string;
            slug: string;
            title: string;
            featured: boolean;
            views: number;
            publishedAt: Date | null;
            order: number;
            summary: string;
            industry: string | null;
            year: number | null;
            technologies: string[];
            coverImageUrl: string | null;
            coverImageAlt: string | null;
            coverBlurHash: string | null;
            metrics: {
                label: string;
                value: string;
                unit: string | null;
                direction: import("@prisma/client").$Enums.MetricDirection;
            }[];
        }[];
        category: {
            name: string;
            id: string;
            nameEn: string;
            slug: string;
            order: number;
        } | null;
        services: ({
            service: {
                id: string;
                slug: string;
                title: string;
            };
        } & {
            projectId: string;
            serviceId: string;
        })[];
        gallery: {
            id: string;
            order: number;
            projectId: string;
            url: string;
            alt: string | null;
            caption: string | null;
            width: number | null;
            height: number | null;
            blurHash: string | null;
        }[];
        metrics: {
            id: string;
            order: number;
            projectId: string;
            label: string;
            value: string;
            unit: string | null;
            direction: import("@prisma/client").$Enums.MetricDirection;
        }[];
        client: string | null;
        id: string;
        role: string | null;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        titleEn: string | null;
        description: string;
        metaDescription: string | null;
        status: import("@prisma/client").$Enums.ProjectStatus;
        featured: boolean;
        views: number;
        categoryId: string | null;
        publishedAt: Date | null;
        order: number;
        summary: string;
        challenge: string | null;
        solution: string | null;
        outcome: string | null;
        approach: Prisma.JsonValue;
        clientLogoUrl: string | null;
        industry: string | null;
        year: number | null;
        durationMonths: number | null;
        teamSize: number | null;
        technologies: string[];
        coverImageUrl: string | null;
        coverImageAlt: string | null;
        coverBlurHash: string | null;
        testimonialQuote: string | null;
        testimonialAuthor: string | null;
        testimonialRole: string | null;
        testimonialAvatarUrl: string | null;
        liveUrl: string | null;
        repoUrl: string | null;
        metaTitle: string | null;
        ogImageUrl: string | null;
    }>;
    private neighbours;
    findAllAdmin(q: QueryProjectsDto): Promise<Paginated<{
        category: {
            name: string;
            id: string;
            slug: string;
        } | null;
        client: string | null;
        id: string;
        createdAt: Date;
        slug: string;
        title: string;
        status: import("@prisma/client").$Enums.ProjectStatus;
        featured: boolean;
        views: number;
        publishedAt: Date | null;
        order: number;
        summary: string;
        industry: string | null;
        year: number | null;
        technologies: string[];
        coverImageUrl: string | null;
        coverImageAlt: string | null;
        coverBlurHash: string | null;
        metrics: {
            label: string;
            value: string;
            unit: string | null;
            direction: import("@prisma/client").$Enums.MetricDirection;
        }[];
    }>>;
    findOne(id: string): Promise<{
        category: {
            name: string;
            id: string;
            nameEn: string;
            slug: string;
            order: number;
        } | null;
        services: ({
            service: {
                id: string;
                slug: string;
                title: string;
            };
        } & {
            projectId: string;
            serviceId: string;
        })[];
        gallery: {
            id: string;
            order: number;
            projectId: string;
            url: string;
            alt: string | null;
            caption: string | null;
            width: number | null;
            height: number | null;
            blurHash: string | null;
        }[];
        metrics: {
            id: string;
            order: number;
            projectId: string;
            label: string;
            value: string;
            unit: string | null;
            direction: import("@prisma/client").$Enums.MetricDirection;
        }[];
    } & {
        client: string | null;
        id: string;
        role: string | null;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        titleEn: string | null;
        description: string;
        metaDescription: string | null;
        status: import("@prisma/client").$Enums.ProjectStatus;
        featured: boolean;
        views: number;
        categoryId: string | null;
        publishedAt: Date | null;
        order: number;
        summary: string;
        challenge: string | null;
        solution: string | null;
        outcome: string | null;
        approach: Prisma.JsonValue;
        clientLogoUrl: string | null;
        industry: string | null;
        year: number | null;
        durationMonths: number | null;
        teamSize: number | null;
        technologies: string[];
        coverImageUrl: string | null;
        coverImageAlt: string | null;
        coverBlurHash: string | null;
        testimonialQuote: string | null;
        testimonialAuthor: string | null;
        testimonialRole: string | null;
        testimonialAvatarUrl: string | null;
        liveUrl: string | null;
        repoUrl: string | null;
        metaTitle: string | null;
        ogImageUrl: string | null;
    }>;
    create(dto: CreateProjectDto): Promise<{
        category: {
            name: string;
            id: string;
            nameEn: string;
            slug: string;
            order: number;
        } | null;
        services: ({
            service: {
                id: string;
                slug: string;
                title: string;
            };
        } & {
            projectId: string;
            serviceId: string;
        })[];
        gallery: {
            id: string;
            order: number;
            projectId: string;
            url: string;
            alt: string | null;
            caption: string | null;
            width: number | null;
            height: number | null;
            blurHash: string | null;
        }[];
        metrics: {
            id: string;
            order: number;
            projectId: string;
            label: string;
            value: string;
            unit: string | null;
            direction: import("@prisma/client").$Enums.MetricDirection;
        }[];
    } & {
        client: string | null;
        id: string;
        role: string | null;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        titleEn: string | null;
        description: string;
        metaDescription: string | null;
        status: import("@prisma/client").$Enums.ProjectStatus;
        featured: boolean;
        views: number;
        categoryId: string | null;
        publishedAt: Date | null;
        order: number;
        summary: string;
        challenge: string | null;
        solution: string | null;
        outcome: string | null;
        approach: Prisma.JsonValue;
        clientLogoUrl: string | null;
        industry: string | null;
        year: number | null;
        durationMonths: number | null;
        teamSize: number | null;
        technologies: string[];
        coverImageUrl: string | null;
        coverImageAlt: string | null;
        coverBlurHash: string | null;
        testimonialQuote: string | null;
        testimonialAuthor: string | null;
        testimonialRole: string | null;
        testimonialAvatarUrl: string | null;
        liveUrl: string | null;
        repoUrl: string | null;
        metaTitle: string | null;
        ogImageUrl: string | null;
    }>;
    update(id: string, dto: UpdateProjectDto): Promise<{
        category: {
            name: string;
            id: string;
            nameEn: string;
            slug: string;
            order: number;
        } | null;
        services: ({
            service: {
                id: string;
                slug: string;
                title: string;
            };
        } & {
            projectId: string;
            serviceId: string;
        })[];
        gallery: {
            id: string;
            order: number;
            projectId: string;
            url: string;
            alt: string | null;
            caption: string | null;
            width: number | null;
            height: number | null;
            blurHash: string | null;
        }[];
        metrics: {
            id: string;
            order: number;
            projectId: string;
            label: string;
            value: string;
            unit: string | null;
            direction: import("@prisma/client").$Enums.MetricDirection;
        }[];
    } & {
        client: string | null;
        id: string;
        role: string | null;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        titleEn: string | null;
        description: string;
        metaDescription: string | null;
        status: import("@prisma/client").$Enums.ProjectStatus;
        featured: boolean;
        views: number;
        categoryId: string | null;
        publishedAt: Date | null;
        order: number;
        summary: string;
        challenge: string | null;
        solution: string | null;
        outcome: string | null;
        approach: Prisma.JsonValue;
        clientLogoUrl: string | null;
        industry: string | null;
        year: number | null;
        durationMonths: number | null;
        teamSize: number | null;
        technologies: string[];
        coverImageUrl: string | null;
        coverImageAlt: string | null;
        coverBlurHash: string | null;
        testimonialQuote: string | null;
        testimonialAuthor: string | null;
        testimonialRole: string | null;
        testimonialAvatarUrl: string | null;
        liveUrl: string | null;
        repoUrl: string | null;
        metaTitle: string | null;
        ogImageUrl: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    publish(id: string): Promise<{
        client: string | null;
        id: string;
        role: string | null;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        titleEn: string | null;
        description: string;
        metaDescription: string | null;
        status: import("@prisma/client").$Enums.ProjectStatus;
        featured: boolean;
        views: number;
        categoryId: string | null;
        publishedAt: Date | null;
        order: number;
        summary: string;
        challenge: string | null;
        solution: string | null;
        outcome: string | null;
        approach: Prisma.JsonValue;
        clientLogoUrl: string | null;
        industry: string | null;
        year: number | null;
        durationMonths: number | null;
        teamSize: number | null;
        technologies: string[];
        coverImageUrl: string | null;
        coverImageAlt: string | null;
        coverBlurHash: string | null;
        testimonialQuote: string | null;
        testimonialAuthor: string | null;
        testimonialRole: string | null;
        testimonialAvatarUrl: string | null;
        liveUrl: string | null;
        repoUrl: string | null;
        metaTitle: string | null;
        ogImageUrl: string | null;
    }>;
    unpublish(id: string): Promise<{
        client: string | null;
        id: string;
        role: string | null;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        titleEn: string | null;
        description: string;
        metaDescription: string | null;
        status: import("@prisma/client").$Enums.ProjectStatus;
        featured: boolean;
        views: number;
        categoryId: string | null;
        publishedAt: Date | null;
        order: number;
        summary: string;
        challenge: string | null;
        solution: string | null;
        outcome: string | null;
        approach: Prisma.JsonValue;
        clientLogoUrl: string | null;
        industry: string | null;
        year: number | null;
        durationMonths: number | null;
        teamSize: number | null;
        technologies: string[];
        coverImageUrl: string | null;
        coverImageAlt: string | null;
        coverBlurHash: string | null;
        testimonialQuote: string | null;
        testimonialAuthor: string | null;
        testimonialRole: string | null;
        testimonialAvatarUrl: string | null;
        liveUrl: string | null;
        repoUrl: string | null;
        metaTitle: string | null;
        ogImageUrl: string | null;
    }>;
    addImages(projectId: string, images: ProjectImageDto[]): Promise<{
        id: string;
        order: number;
        projectId: string;
        url: string;
        alt: string | null;
        caption: string | null;
        width: number | null;
        height: number | null;
        blurHash: string | null;
    }[]>;
    removeImage(id: string): Promise<{
        message: string;
        url: string;
    }>;
    reorder(items: ReorderItemDto[], table: 'project' | 'projectImage'): Promise<{
        message: string;
        count: number;
    }>;
    categories(): Prisma.PrismaPromise<{
        name: string;
        id: string;
        nameEn: string;
        slug: string;
        order: number;
    }[]>;
}
