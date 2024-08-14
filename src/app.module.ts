import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ApplicationController } from './database/application/application.controller';
import { ApplicationService } from './database/application/application.service';
import { AppAccessService } from './database/appAccess/appAccess.service';
import { AppAccessController } from './database/appAccess/appAccess.controller';
import { PrismaService } from './database/prisma/prisma.service';
import { YahooFinanceService } from './yahooFinance/yahooFinance.service';
import { YahooFinanceController } from './yahooFinance/yahooFinance.controller';

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
        limit: 25,
      },
      {
        name: 'short',
        ttl: 60000,
        limit: 10,
      },
      {
        name: 'longer',
        ttl: 60000,
        limit: 70,
      },
    ]),
  ],
  controllers: [
    ApplicationController, 
    AppAccessController,
    YahooFinanceController
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    ApplicationService,
    AppAccessService,
    PrismaService,
    YahooFinanceService
  ],
})
export class AppModule {}