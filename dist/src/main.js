"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Bootstrap');
    app.use((0, helmet_1.default)());
    app.setGlobalPrefix('api');
    app.enableVersioning({ type: common_1.VersioningType.URI, defaultVersion: '1' });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    app.use(cookieParser());
    const defaultOrigins = [
        'http://localhost:3000',
        'http://localhost:3002',
        'http://localhost:3003',
        'https://rvios-dashboard.vercel.app',
        'https://rvios-site.vercel.app',
        'https://rvios-owner.vercel.app',
    ];
    const envOrigins = process.env.CORS_ORIGINS
        ? process.env.CORS_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean)
        : [];
    const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            logger.warn(`CORS rejected origin: ${origin}`);
            return callback(new Error('Not allowed by CORS'), false);
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-company-id'],
    });
    const openapi = new swagger_1.DocumentBuilder()
        .setTitle('RVIOS API')
        .setDescription('منصة RVIOS — واجهة الموقع ولوحة التحكم والتطبيق')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
        .addGlobalParameters({
        name: 'x-company-id',
        in: 'header',
        required: false,
        description: 'سياق المستأجر — مطلوب لوحدات التطبيق',
        schema: { type: 'string' },
    })
        .build();
    swagger_1.SwaggerModule.setup('api/docs', app, swagger_1.SwaggerModule.createDocument(app, openapi), { jsonDocumentUrl: 'api/docs/openapi.json' });
    const port = process.env.PORT || process.env.API_PORT || 3001;
    await app.listen(port, '0.0.0.0');
    logger.log(`RVIOS API running on port ${port}`);
    logger.log(`Health: /api/v1/health · Docs: /api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map