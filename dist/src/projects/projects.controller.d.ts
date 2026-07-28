import { ProjectsService, CreateProjectDto, UpdateProjectDto } from './projects.service';
export declare class ProjectsController {
    private svc;
    constructor(svc: ProjectsService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        featured: boolean;
        order: number;
        imageUrl: string | null;
        technologies: string[];
        url: string | null;
    }[]>;
    findFeatured(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        featured: boolean;
        order: number;
        imageUrl: string | null;
        technologies: string[];
        url: string | null;
    }[]>;
    findAllAdmin(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        featured: boolean;
        order: number;
        imageUrl: string | null;
        technologies: string[];
        url: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        featured: boolean;
        order: number;
        imageUrl: string | null;
        technologies: string[];
        url: string | null;
    }>;
    create(dto: CreateProjectDto): import("@prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        featured: boolean;
        order: number;
        imageUrl: string | null;
        technologies: string[];
        url: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateProjectDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        featured: boolean;
        order: number;
        imageUrl: string | null;
        technologies: string[];
        url: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
