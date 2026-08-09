import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    readonly scoped: import("@prisma/client/runtime/library").DynamicClientExtensionThis<Prisma.TypeMap<import("@prisma/client/runtime/library").InternalArgs & {
        result: {};
        model: {};
        query: {};
        client: {};
    }, {}>, Prisma.TypeMapCb<Prisma.PrismaClientOptions>, {
        result: {};
        model: {};
        query: {};
        client: {};
    }>;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    static isScoped(model: string): boolean;
}
