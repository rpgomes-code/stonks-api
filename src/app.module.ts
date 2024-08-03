import { AppAccessService } from './database/appAccess/appAccess.service';
import { AppAccessController } from './database/appAccess/appAccess.controller';
import { Module } from '@nestjs/common';
import { ApplicationController } from './database/application/application.controller';
import { ApplicationService } from './database/application/application.service';
import { PrismaService } from './database/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [
    ApplicationController, 
    AppAccessController
  ],
  providers: [
    ApplicationService,
    AppAccessService,
    PrismaService
  ],
})
export class AppModule {}
