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
        service: string | null;
        message: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: import("@prisma/client").$Enums.ContactStatus;
        phone: string | null;
    }[]>;
    findOne(id: string): Promise<{
        service: string | null;
        message: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: import("@prisma/client").$Enums.ContactStatus;
        phone: string | null;
    }>;
    create(dto: CreateContactDto): import("@prisma/client").Prisma.Prisma__ContactClient<{
        service: string | null;
        message: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: import("@prisma/client").$Enums.ContactStatus;
        phone: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateStatus(id: string, dto: UpdateContactStatusDto): Promise<{
        service: string | null;
        message: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: import("@prisma/client").$Enums.ContactStatus;
        phone: string | null;
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
