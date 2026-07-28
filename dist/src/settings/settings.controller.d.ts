import { SettingsService, UpdateSettingDto } from './settings.service';
export declare class SettingsController {
    private svc;
    constructor(svc: SettingsService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        type: import("@prisma/client").$Enums.SettingType;
        value: string;
        key: string;
        label: string | null;
    }[]>;
    findOne(key: string): Promise<{
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
    bulkUpdate(body: {
        settings: {
            key: string;
            value: string;
        }[];
    }): Promise<{
        id: string;
        type: import("@prisma/client").$Enums.SettingType;
        value: string;
        key: string;
        label: string | null;
    }[]>;
}
