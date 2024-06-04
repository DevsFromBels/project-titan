import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class MarketIdService {
  constructor(private prisma: PrismaService) {}

  async getMarketPostByID(id: string) {
    const post = await this.prisma.market.findFirst({
      where: { content_id: id },
    });

    if (!post) {
      throw new BadRequestException(`This market post is not found`);
    }

    return post;
  }
}
