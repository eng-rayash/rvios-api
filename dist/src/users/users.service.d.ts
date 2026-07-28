import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        email: string;
        id: string;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        email: string;
        id: string;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(dto: CreateUserDto): Promise<{
        email: string;
        id: string;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        email: string;
        id: string;
        role: import("@prisma/client").$Enums.UserRole;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
