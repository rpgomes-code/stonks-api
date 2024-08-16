import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { config } from 'dotenv';
import * as fs from 'fs';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Stonks - Yahoo Finance API')
    .setDescription('API for fetching Yahoo Finance data through the Stonks service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  fs.writeFileSync('./swagger.json', JSON.stringify(document));
  SwaggerModule.setup('api', app, document);

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
  
  const port = process.env.PORT || 3010;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation is available at: http://localhost:${port}/api`);
}

bootstrap();