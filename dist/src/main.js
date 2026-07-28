"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.use(cookieParser());
    const origins = (process.env.CORS_ORIGINS || 'http://localhost:3000').split(',');
    app.enableCors({
        origin: origins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    const port = process.env.PORT || process.env.API_PORT || 3001;
    await app.listen(port, '0.0.0.0');
    console.log(`\n🚀 RVIOS API running on port: ${port}`);
    console.log(`   Health check endpoint: /api/health\n`);
}
bootstrap();
//# sourceMappingURL=main.js.map