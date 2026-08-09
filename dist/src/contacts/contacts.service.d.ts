import { ContactStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class CreateContactDto {
    name: string;
    email: string;
    phone?: string;
    service?: string;
    message: string;
}
export declare class UpdateContactStatusDto {
    status: ContactStatus;
}
export declare class ContactsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        service: string | null;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.ContactStatus;
        phone: string | null;
        message: string;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        service: string | null;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.ContactStatus;
        phone: string | null;
        message: string;
    }>;
    create(dto: CreateContactDto): import("@prisma/client").Prisma.Prisma__ContactClient<{
        name: string;
        service: string | null;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.ContactStatus;
        phone: string | null;
        message: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateStatus(id: string, dto: UpdateContactStatusDto): Promise<{
        name: string;
        service: string | null;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.ContactStatus;
        phone: string | null;
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    stats(): import("@prisma/client").Prisma.GetContactGroupByPayload<{
        by: "status"[];
        _count: {
            status: true;
        };
    }>;
}
