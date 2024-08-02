import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Req,
  } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application as ApplicationModel } from '@prisma/client';
import { Request } from 'express';
  
@Controller('auth')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
  ) {}

  @Get('application/:id')
  async getApplicationById(@Param('slug') slug: string): Promise<ApplicationModel> {
    return this.applicationService.application({ app_slug: slug });
  }

  @Get('applications')
  async getApplications(
    @Param('skip') skip: number, 
    @Param('take') take: number,
    @Param('searchString') searchString: string,
  ): Promise<ApplicationModel[]> {
    const searchOptions = {
      skip: skip || 0,
      take: take || 10,
      where: {},
    };

    if (searchString) {
      searchOptions.where = {
      OR: [
        {
        public_id: { contains: searchString },
        },
        {
        id: { equals: Number(searchString) },
        },
        {
        app_slug: { contains: searchString },
        },
        {
        app_ip: { contains: searchString },
        },
      ],
      };
    }

    return this.applicationService.applications(searchOptions);
  }

  @Post('application')
  async createApplication(
    @Req() request: Request,
    @Body() applicationData: { app_slug: string; },
  ): Promise<ApplicationModel> {
    const requestIp = request.socket.remoteAddress;
    const { app_slug } = applicationData;
    return this.applicationService.createApplication({
      app_slug,
      app_ip: requestIp || '0.0.0.0',
    });
  }

  @Put('application/:id')
    async updateApplication(
      @Param('id') id: string,
      @Body() applicationData: { app_slug: string; },
    ): Promise<ApplicationModel> {
    const { app_slug } = applicationData;
    return this.applicationService.updateApplication({
      where: { id },
      data: { app_slug },
    });
  }

  @Delete('application/:id')
  async deletePost(@Param('id') id: string): Promise<ApplicationModel> {
    return this.applicationService.deleteApplication({ id });
  };
}

