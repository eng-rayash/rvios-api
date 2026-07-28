import { ContactsService, CreateContactDto, UpdateContactStatusDto } from './contacts.service';
export declare class ContactsController {
    private svc;
    constructor(svc: ContactsService);
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
    stats(): import("@prisma/client").Prisma.GetContactGroupByPayload<{
        by: "status"[];
        _count: {
            status: true;
        };
    }>;
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
}
