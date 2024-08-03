import { Injectable } from '@nestjs/common';
import { Application, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async application(
    applicationWhereUniqueInput: Prisma.ApplicationWhereUniqueInput,
  ): Promise<Application | null> {
    return this.prisma.application.findUnique({
      where: applicationWhereUniqueInput,
    });
  }

  async applications(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ApplicationWhereUniqueInput;
    where?: Prisma.ApplicationWhereInput;
    orderBy?: Prisma.ApplicationOrderByWithRelationInput;
  }): Promise<Application[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.application.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createApplication(data: Prisma.ApplicationCreateInput): Promise<Application> {
    return this.prisma.application.create({
      data,
    });
  }

  async updateApplication(params: {
    where: Prisma.ApplicationWhereUniqueInput;
    data: Prisma.ApplicationUpdateInput;
  }): Promise<Application> {
    const { where, data } = params;
    return this.prisma.application.update({
      data,
      where,
    });
  }

  async deleteApplication(where: Prisma.ApplicationWhereUniqueInput): Promise<Application> {
    return this.prisma.application.delete({
      where,
    });
  }
}