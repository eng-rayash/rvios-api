import { PrismaService } from '../prisma/prisma.service';
export declare class UpdateSettingDto {
    value: string;
}
export declare class SettingsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        type: import("@prisma/client").$Enums.SettingType;
        value: string;
        key: string;
        label: string | null;
    }[]>;
    findByKey(key: string): Promise<{
        id: string;
        type: import("@prisma/client").$Enums.SettingType;
        value: string;
        key: string;
        label: string | null;
    }>;
    update(key: string, dto: UpdateSettingDto): Promise<{
        id: string;
        type: import("@prisma/client").$Enums.SettingType;
        value: string;
        key: string;
        label: string | null;
    }>;
    bulkUpdate(settings: {
        key: string;
        value: string;
    }[]): Promise<{
        id: string;
        type: import("@prisma/client").$Enums.SettingType;
        value: string;
        key: string;
        label: string | null;
    }[]>;
}
