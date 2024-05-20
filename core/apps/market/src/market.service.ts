import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";

@Injectable()
export class MarketService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return "Hello World!";
  }

  /**
   * Create a new market product by user
   *
   * @async
   * @param {string} image
   * @param {string} name
   * @param {string} userID
   * @param {string} price_per_show
   * @param {string} total_shows
   * @returns {unknown}
   */
  async createProduct(
    image: string,
    name: string,
    userID: string,
    price_per_show: string,
    total_shows: string
  ) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userID,
      },
    });

    if (!user) {
      return new BadRequestException("User not found");
    }

    if (!image) {
      return new BadRequestException("Image not found");
    }

    if (!price_per_show) {
      return new BadRequestException("Price not found");
    }

    return await this.prisma.market.create({
      data: {
        content: image,
        name: name,
        link: "",
        user_id: userID,
        price_for_show: parseFloat(price_per_show),
        total_shows: parseInt(total_shows),
        current_shows: 0,
      },
    });
  }

  /**
   * GetAllUserMarketData
   *
   * @async
   * @param {string} userID
   * @returns {unknown}
   */
  async getAllUserMarketProducts(userID: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userID,
      },
    });

    if (!user) {
      return new BadRequestException("User not found");
    }

    const allUserMarketProducts = await this.prisma.market.findMany({
      where: {
        user_id: user.id,
      },
    });

    if (!allUserMarketProducts) return [];

    return allUserMarketProducts;
  }

  /**
   * Returns All Market Data
   *
   * @async
   * @returns {unknown}
   */
  async getMarket() {
    return this.prisma.market.findMany();
  }
}
