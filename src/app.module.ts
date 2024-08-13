import { Module } from '@nestjs/common';
import { ApplicationController } from './database/application/application.controller';
import { ApplicationService } from './database/application/application.service';
import { AppAccessService } from './database/appAccess/appAccess.service';
import { AppAccessController } from './database/appAccess/appAccess.controller';
import { PrismaService } from './database/prisma/prisma.service';
import { YahooFinanceService } from './yahooFinance/yahooFinance.service';
import { YahooFinanceController } from './yahooFinance/yahooFinance.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 60 * 1000,
    }),
  ],
  controllers: [
    ApplicationController, 
    AppAccessController,
    YahooFinanceController
  ],
  providers: [
    ApplicationService,
    AppAccessService,
    PrismaService,
    YahooFinanceService
  ],
})
export class AppModule {}