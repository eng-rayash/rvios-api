import { ProjectsService } from './projects.service';
import { QueryProjectsDto } from './dto/query-projects.dto';
export declare class ProjectsController {
    private svc;
    constructor(svc: ProjectsService);
    findPublic(query: QueryProjectsDto): Promise<import("../common/dto/pagination.dto").Paginated<unknown>>;
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
    categories(): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        nameEn: string;
        slug: string;
        order: number;
    }[]>;
    slugs(): import("@prisma/client").Prisma.PrismaPromise<{
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
        approach: import("@prisma/client/runtime/library").JsonValue;
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
}
