import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../prisma/prisma.service";

@Injectable()
export class MarketSubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async subscribe(product_id: string, user_id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: user_id },
    });

    const sub_token = await this.prisma.userSubscriptions.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!sub_token.token) {
      throw new BadRequestException("Token not found");
    }

    await this.prisma.userSubscriptions.create({
      data: {
        userId: user.id,
        marketId: product_id,
        token: user.id,
      },
    });

    return {
      statusCode: 200,
    };
  }

  /**
   * get market subscriptions by tokens
   *
   * @async
   * @param {string} user_id
   * @returns {unknown}
   */
  async getTokenSubscriptions(user_id: string) {
    const userSubscriptions = await this.prisma.userSubscriptions.findMany({
      where: {
        userId: user_id,
      },
      include: {
        market: true,
      },
    });
  
    if (userSubscriptions.length === 0) {
      throw new BadRequestException("Token not found");
    }
  
    return userSubscriptions.map(sub => sub.market);
  }
  
}
