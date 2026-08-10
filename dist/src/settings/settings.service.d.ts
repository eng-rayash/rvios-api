import { PrismaService } from '../prisma/prisma.service';
import { SettingEntryDto, UpdateSettingDto } from './dto/setting.dto';
export declare class SettingsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        type: import("@prisma/client").$Enums.SettingType;
        id: string;
        label: string | null;
        value: string;
        key: string;
    }[]>;
    findPublic(): Promise<Record<string, string>>;
    findByKey(key: string): Promise<{
        type: import("@prisma/client").$Enums.SettingType;
        id: string;
        label: string | null;
        value: string;
        key: string;
    }>;
    update(key: string, dto: UpdateSettingDto): Promise<{
        type: import("@prisma/client").$Enums.SettingType;
        id: string;
        label: string | null;
        value: string;
        key: string;
    }>;
    bulkUpdate(settings: SettingEntryDto[]): Promise<{
        type: import("@prisma/client").$Enums.SettingType;
        id: string;
        label: string | null;
        value: string;
        key: string;
    }[]>;
}
