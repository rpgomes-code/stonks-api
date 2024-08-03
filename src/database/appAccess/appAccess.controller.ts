import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    NotFoundException,
  } from '@nestjs/common';
import { AppAccess as AppAccessModel } from '@prisma/client';
import { ApplicationService } from './../application/application.service';
import { AppAccessService } from './appAccess.service';
import { CreateAppAccessDto, UpdateAppAccessDto } from './appAccess.dto'; 

@Controller('auth')
export class AppAccessController {
  constructor(
    private readonly appAccessService: AppAccessService,
    private readonly applicationService: ApplicationService,
  ) {}

  @Get('app-access/:id')
  async getAppAccessById(@Param('id') id: string): Promise<AppAccessModel> {
    const appAccess = await this.appAccessService.appAccess({ id });
    if (!appAccess) {
      throw new NotFoundException(`App Access with ID ${id} not found`);
    }
    return appAccess;
  }

  @Get('app-accesses/:skip/:take/:searchString')
  async getAppAccesses(
    @Param('skip') skip: string, 
    @Param('take') take: string,
    @Param('searchString') searchString: string,
  ): Promise<AppAccessModel[]> {
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
        appId: { contains: searchString },
        },
      ],
      };
    }
    const appAccesses = await this.appAccessService.appAccesses(searchOptions);
    if (!appAccesses || appAccesses.length === 0) {
      throw new NotFoundException(`App Accesses not found`);
    }
    return appAccesses;
  }

  @Get('app-accesses-is-active/:skip/:take/:isActive')
  async getAppAccessesByIsActive(
    @Param('skip') skip: string, 
    @Param('take') take: string,
    @Param('isActive') isActive: string,
  ): Promise<AppAccessModel[]> {
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

    const appAccesses = await this.appAccessService.appAccesses(searchOptions);
    if (!appAccesses || appAccesses.length === 0) {
      throw new NotFoundException(`App Accesses with isActive equal to ${isActive} not found`);
    }
    return appAccesses;
  }

  @Post('app-access')
  async createAppAccess(
    @Body() appAccessData: CreateAppAccessDto,
  ): Promise<AppAccessModel> {
    const { appId } = appAccessData;
    const application = await this.applicationService.application({ id: appId });
    if (!application) {
      throw new NotFoundException(`Application with ID ${appId} not found`);
    }
    return await this.appAccessService.createAppAccess({
      application: { connect: { id: appId } },
      expiresAt: new Date( new Date().getTime() + 1000 * 60 * 60 * 24 * 30 ),
    });
  }

  @Put('app-access/:id')
    async updateAppAccess(
      @Param('id') id: string,
      @Body() appAccessData: UpdateAppAccessDto,
    ): Promise<AppAccessModel> {
    const { isActive } = appAccessData;
    const appAccess = await this.appAccessService.appAccess({ id });
    if (!appAccess) {
      throw new NotFoundException(`App Access with ID ${id} not found`);
    }
    return await this.appAccessService.updateAppAccess({
      where: { id },
      data: { isActive },
    });
  }

  @Delete('app-access/:id')
  async deleteAppAccess(@Param('id') id: string): Promise<AppAccessModel> {
    const appAccess = await this.appAccessService.appAccess({ id });
    if (!appAccess) {
      throw new NotFoundException(`App Access with ID ${id} not found`);
    }
    return await this.appAccessService.deleteAppAccess({ id });
  };
}

