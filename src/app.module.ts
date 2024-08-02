import { Module } from '@nestjs/common';
import { ApplicationController } from './database/application/application.controller';
import { ApplicationService } from './database/application/application.service';
import { PrismaService } from './database/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ApplicationController],
  providers: [ApplicationService,PrismaService],
})
export class AppModule {}
