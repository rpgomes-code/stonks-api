import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
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
  
  /* IMPLEMENT CUSTOM ORIGIN LOGIC LIKE CERBERUS
  app.enableCors((req, callback) => {
    const corsOptions: CorsOptions = {
      // Your default options here
    };
  
    if (req.header('Origin') === 'http://trusted-client.com') {
      corsOptions.origin = true; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions.origin = false; // disable CORS for this request
    }
  
    callback(null, corsOptions); // callback expects two parameters: error and options
  });
  */

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
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
