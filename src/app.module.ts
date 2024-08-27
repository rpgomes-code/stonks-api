import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaService } from './database/prisma/prisma.service';
import { YahooFinanceService } from './yahooFinance/yahooFinance.service';
import { YahooFinanceController } from './yahooFinance/yahooFinance.controller';
import { LogService } from './database/log/log.service';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggingInterceptor } from './logging.interceptor';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 60 * 1000,
    }),
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60000,
        limit: 100,
      },
      {
        name: 'short',
        ttl: 60000,
        limit: 75,
      },
      {
        name: 'longer',
        ttl: 60000,
        limit: 250,
      },
    ]),
  ],
  controllers: [
    YahooFinanceController
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    PrismaService,
    YahooFinanceService,
    LogService
  ],
})
export class AppModule {}