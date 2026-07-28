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
  const origins = (process.env.CORS_ORIGINS || 'http://localhost:3000').split(',');
  app.enableCors({
    origin: origins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ── Start ──────────────────────────────────────────────────
  const port = process.env.API_PORT ?? 3001;
  await app.listen(port);
  console.log(`\n🚀 RVIOS API running on: http://localhost:${port}/api`);
  console.log(`   Health: http://localhost:${port}/api/health\n`);
}

bootstrap();
