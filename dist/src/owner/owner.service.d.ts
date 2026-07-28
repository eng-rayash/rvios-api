import { PrismaService } from '../prisma/prisma.service';
export declare class UpdateOwnerProfileDto {
    name?: string;
    title?: string;
    titleEn?: string;
    bio?: string;
    bioEn?: string;
    avatarUrl?: string;
    skills?: string[];
    links?: Record<string, string>;
    resumeUrl?: string;
}
export declare class OwnerService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(): Promise<{
        id: string;
        updatedAt: Date;
        name: string;
        title: string;
        titleEn: string;
        bio: string;
        bioEn: string;
        avatarUrl: string | null;
        skills: string[];
        links: import("@prisma/client/runtime/library").JsonValue;
        resumeUrl: string | null;
    }>;
    updateProfile(dto: UpdateOwnerProfileDto): Promise<{
        id: string;
        updatedAt: Date;
        name: string;
        title: string;
        titleEn: string;
        bio: string;
        bioEn: string;
        avatarUrl: string | null;
        skills: string[];
        links: import("@prisma/client/runtime/library").JsonValue;
        resumeUrl: string | null;
    }>;
}
