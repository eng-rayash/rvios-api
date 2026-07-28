import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ── Global prefix ──────────────────────────────────────────
  app.setGlobalPrefix('api');

  // ── Validation ─────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ── Cookie Parser ──────────────────────────────────────────
  app.use(cookieParser());

  // ── CORS ───────────────────────────────────────────────────
  const defaultOrigins = 'http://localhost:3000,http://localhost:3002,http://localhost:3003';
  const origins = (process.env.CORS_ORIGINS || defaultOrigins).split(',');
  app.enableCors({
    origin: origins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ── Start ──────────────────────────────────────────────────
  const port = process.env.PORT || process.env.API_PORT || 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`\n🚀 RVIOS API running on port: ${port}`);
  console.log(`   Health check endpoint: /api/health\n`);
}

bootstrap();
