import { ContactsService, CreateContactDto, UpdateContactStatusDto } from './contacts.service';
export declare class ContactsController {
    private svc;
    constructor(svc: ContactsService);
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
    stats(): import("@prisma/client").Prisma.GetContactGroupByPayload<{
        by: "status"[];
        _count: {
            status: true;
        };
    }>;
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
}
