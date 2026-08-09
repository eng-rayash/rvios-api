"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const tenant_context_1 = require("../common/tenant/tenant.context");
const SCOPED_MODELS = new Set(client_1.Prisma.dmmf.datamodel.models
    .filter((m) => m.fields.some((f) => f.name === 'companyId'))
    .map((m) => m.name));
const FILTERABLE_OPS = new Set([
    'findFirst', 'findFirstOrThrow', 'findMany', 'count',
    'aggregate', 'groupBy', 'updateMany', 'deleteMany',
]);
const UNIQUE_OPS = new Set(['findUnique', 'findUniqueOrThrow']);
let PrismaService = PrismaService_1 = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(PrismaService_1.name);
        this.scoped = this.$extends({
            query: {
                $allModels: {
                    $allOperations({ model, operation, args, query }) {
                        const companyId = tenant_context_1.TenantContext.companyId;
                        if (!companyId || !model || !SCOPED_MODELS.has(model)) {
                            return query(args);
                        }
                        const a = (args ?? {});
                        if (FILTERABLE_OPS.has(operation) || UNIQUE_OPS.has(operation)) {
                            return query({ ...a, where: { ...(a.where ?? {}), companyId } });
                        }
                        if (operation === 'create') {
                            const c = a;
                            return query({
                                ...c,
                                data: { companyId, ...(c.data ?? {}) },
                            });
                        }
                        return query(args);
                    },
                },
            },
        });
    }
    async onModuleInit() {
        await this.$connect();
        this.logger.log(SCOPED_MODELS.size
            ? `Tenant scoping active for: ${[...SCOPED_MODELS].join(', ')}`
            : 'No tenant-scoped models yet — platform models are global by design');
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    static isScoped(model) {
        return SCOPED_MODELS.has(model);
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)()
], PrismaService);
//# sourceMappingURL=prisma.service.js.map