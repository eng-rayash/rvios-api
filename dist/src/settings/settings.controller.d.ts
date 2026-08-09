import { SettingsService } from './settings.service';
import { BulkUpdateSettingsDto, UpdateSettingDto } from './dto/setting.dto';
export declare class SettingsController {
    private svc;
    constructor(svc: SettingsService);
    findPublic(): Promise<Record<string, string>>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        type: import("@prisma/client").$Enums.SettingType;
        id: string;
        key: string;
        value: string;
        label: string | null;
    }[]>;
    findOne(key: string): Promise<{
        type: import("@prisma/client").$Enums.SettingType;
        id: string;
        key: string;
        value: string;
        label: string | null;
    }>;
    update(key: string, dto: UpdateSettingDto): Promise<{
        type: import("@prisma/client").$Enums.SettingType;
        id: string;
        key: string;
        value: string;
        label: string | null;
    }>;
    bulkUpdate(dto: BulkUpdateSettingsDto): Promise<{
        type: import("@prisma/client").$Enums.SettingType;
        id: string;
        key: string;
        value: string;
        label: string | null;
    }[]>;
}
