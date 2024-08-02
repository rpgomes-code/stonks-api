import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MethodAccess, Prisma } from '@prisma/client';

@Injectable()
export class MethodAccessService {
  constructor(private prisma: PrismaService) {}

  async methodAccess(
    methodAccessWhereUniqueInput: Prisma.MethodAccessWhereUniqueInput,
  ): Promise<MethodAccess | null> {
    return this.prisma.methodAccess.findUnique({
      where: methodAccessWhereUniqueInput,
    });
  }

  async methodAccesss(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MethodAccessWhereUniqueInput;
    where?: Prisma.MethodAccessWhereInput;
    orderBy?: Prisma.MethodAccessOrderByWithRelationInput;
  }): Promise<MethodAccess[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.methodAccess.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createMethodAccess(data: Prisma.MethodAccessCreateInput): Promise<MethodAccess> {
    return this.prisma.methodAccess.create({
      data,
    });
  }

  async updateMethodAccess(params: {
    where: Prisma.MethodAccessWhereUniqueInput;
    data: Prisma.MethodAccessUpdateInput;
  }): Promise<MethodAccess> {
    const { where, data } = params;
    return this.prisma.methodAccess.update({
      data,
      where,
    });
  }

  async deleteMethodAccess(where: Prisma.MethodAccessWhereUniqueInput): Promise<MethodAccess> {
    return this.prisma.methodAccess.delete({
      where,
    });
  }
}