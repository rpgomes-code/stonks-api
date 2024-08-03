import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Req,
    NotFoundException,
    ConflictException,
  } from '@nestjs/common';
import { application, Request } from 'express';
import { Application as ApplicationModel } from '@prisma/client';
import { ApplicationService } from './application.service';
import { CreateApplicationDto, UpdateApplicationDto } from './application.dto';
  
@Controller('auth')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
  ) {}

  @Get('application/:id')
  async getApplicationById(@Param('id') id: string): Promise<ApplicationModel> {
    const application = await this.applicationService.application({ id });
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return application;
  }

  @Get('applications/:skip/:take/:searchString')
  async getApplications(
    @Param('skip') skip: string, 
    @Param('take') take: string,
    @Param('searchString') searchString: string,
  ): Promise<ApplicationModel[]> {
    const searchOptions = {
      skip: Number(skip) || 0,
      take: Number(take) || 10,
      where: {},
    };

    if (searchString) {
      searchOptions.where = {
      OR: [
        {
        id: { contains: searchString },
        },
        {
        appSlug: { contains: searchString },
        },
        {
        appIp: { contains: searchString },
        },
      ],
      };
    }
    const applications = await this.applicationService.applications(searchOptions);
    if (!applications || applications.length === 0) {
      throw new NotFoundException(`Applications not found`);
    }
    return applications;
  }

  @Get('applications-is-active/:skip/:take/:isActive')
  async getApplicationsByIsActive(
    @Param('skip') skip: string, 
    @Param('take') take: string,
    @Param('isActive') isActive: string,
  ): Promise<ApplicationModel[]> {
    const searchOptions = {
      skip: Number(skip) || 0,
      take: Number(take) || 10,
      where: {},
    };
    
    if (isActive === 'true' || isActive === '1') {
      searchOptions.where = {
        isActive: { equals: true },
      };
    } else if (!isActive || isActive === 'false' || isActive === '0') {  
      searchOptions.where = {
        isActive: { equals: false },
      };
    }

    const applications = await this.applicationService.applications(searchOptions);
    if (!applications || applications.length === 0) {
      throw new NotFoundException(`Applications with isActive equal to ${isActive} not found`);
    }
    return applications;
  }

  @Post('application')
  async createApplication(
    @Req() request: Request,
    @Body() applicationData: CreateApplicationDto,
  ): Promise<ApplicationModel> {
    const requestIp = request.socket.remoteAddress;
    const { appSlug } = applicationData;
    const applicationBySlug = await this.applicationService.application({ appSlug });
    if (applicationBySlug) {
      throw new ConflictException(`Application with slug ${appSlug} already exists`);
    }
    const applicationByIp = await this.applicationService.application({ appIp: requestIp });
    if (applicationByIp) {
      throw new ConflictException(`Application with IP ${requestIp} already exists`);
    }
    return await this.applicationService.createApplication({
      appSlug,
      appIp: requestIp,
    });
  }

  @Put('application/:id')
    async updateApplication(
      @Param('id') id: string,
      @Body() applicationData: UpdateApplicationDto,
    ): Promise<ApplicationModel> {
    const { appSlug , isActive } = applicationData;
    const application = await this.applicationService.application({ id });
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return await this.applicationService.updateApplication({
      where: { id },
      data: { 
        appSlug,
        isActive
      },
    });
  }

  @Delete('application/:id')
  async deleteApplication(@Param('id') id: string): Promise<ApplicationModel> {
    const application = await this.applicationService.application({ id });
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return await this.applicationService.deleteApplication({ id });
  };
}

