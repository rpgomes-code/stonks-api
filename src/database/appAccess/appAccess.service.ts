import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AppAccess, Prisma } from '@prisma/client';

@Injectable()
export class AppAccessService {
  constructor(private prisma: PrismaService) {}

  async appAccess(
    appAccessWhereUniqueInput: Prisma.AppAccessWhereUniqueInput,
  ): Promise<AppAccess | null> {
    return this.prisma.appAccess.findUnique({
      where: appAccessWhereUniqueInput,
    });
  }

  async appAccesss(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AppAccessWhereUniqueInput;
    where?: Prisma.AppAccessWhereInput;
    orderBy?: Prisma.AppAccessOrderByWithRelationInput;
  }): Promise<AppAccess[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.appAccess.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAppAccess(data: Prisma.AppAccessCreateInput): Promise<AppAccess> {
    return this.prisma.appAccess.create({
      data,
    });
  }

  async updateAppAccess(params: {
    where: Prisma.AppAccessWhereUniqueInput;
    data: Prisma.AppAccessUpdateInput;
  }): Promise<AppAccess> {
    const { where, data } = params;
    return this.prisma.appAccess.update({
      data,
      where,
    });
  }

  async deleteAppAccess(where: Prisma.AppAccessWhereUniqueInput): Promise<AppAccess> {
    return this.prisma.appAccess.delete({
      where,
    });
  }
}