import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*';

  const corsOptions: CorsOptions = {
    origin: allowedOrigins,
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length', 'X-Total-Count'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.enableCors({
    ...corsOptions,
    origin: (origin, callback) => {
      if (allowedOrigins === '*') {
        callback(null, true);
        return;
      }
      if (!origin || (Array.isArray(allowedOrigins) && allowedOrigins.includes(origin))) {
        callback(null, true);
      } else {
        console.log(`CORS error: ${origin} not allowed`);
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();