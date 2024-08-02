import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AccessToken, Prisma } from '@prisma/client';

@Injectable()
export class AccessTokenService {
  constructor(private prisma: PrismaService) {}

  async accessToken(
    accessTokenWhereUniqueInput: Prisma.AccessTokenWhereUniqueInput,
  ): Promise<AccessToken | null> {
    return this.prisma.accessToken.findUnique({
      where: accessTokenWhereUniqueInput,
    });
  }

  async accessTokens(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AccessTokenWhereUniqueInput;
    where?: Prisma.AccessTokenWhereInput;
    orderBy?: Prisma.AccessTokenOrderByWithRelationInput;
  }): Promise<AccessToken[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.accessToken.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAccessToken(data: Prisma.AccessTokenCreateInput): Promise<AccessToken> {
    return this.prisma.accessToken.create({
      data,
    });
  }

  async updateAccessToken(params: {
    where: Prisma.AccessTokenWhereUniqueInput;
    data: Prisma.AccessTokenUpdateInput;
  }): Promise<AccessToken> {
    const { where, data } = params;
    return this.prisma.accessToken.update({
      data,
      where,
    });
  }

  async deleteAccessToken(where: Prisma.AccessTokenWhereUniqueInput): Promise<AccessToken> {
    return this.prisma.accessToken.delete({
      where,
    });
  }
}