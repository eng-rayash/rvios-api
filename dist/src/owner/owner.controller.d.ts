import { OwnerService, UpdateOwnerProfileDto } from './owner.service';
export declare class OwnerController {
    private svc;
    constructor(svc: OwnerService);
    getProfile(): Promise<{
        name: string;
        id: string;
        updatedAt: Date;
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
        name: string;
        id: string;
        updatedAt: Date;
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
