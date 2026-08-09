"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const tenant_middleware_1 = require("./common/tenant/tenant.middleware");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const posts_module_1 = require("./posts/posts.module");
const categories_module_1 = require("./categories/categories.module");
const services_module_1 = require("./services/services.module");
const projects_module_1 = require("./projects/projects.module");
const media_module_1 = require("./media/media.module");
const contacts_module_1 = require("./contacts/contacts.module");
const settings_module_1 = require("./settings/settings.module");
const owner_module_1 = require("./owner/owner.module");
const health_module_1 = require("./health/health.module");
const configuration_1 = require("./config/configuration");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(tenant_middleware_1.TenantMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
                envFilePath: ['.env.local', '.env'],
            }),
            throttler_1.ThrottlerModule.forRoot([
                { name: 'short', ttl: 1000, limit: 10 },
                { name: 'long', ttl: 60000, limit: 100 },
            ]),
            prisma_module_1.PrismaModule,
            health_module_1.HealthModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            posts_module_1.PostsModule,
            categories_module_1.CategoriesModule,
            services_module_1.ServicesModule,
            projects_module_1.ProjectsModule,
            media_module_1.MediaModule,
            contacts_module_1.ContactsModule,
            settings_module_1.SettingsModule,
            owner_module_1.OwnerModule,
        ],
        providers: [
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map