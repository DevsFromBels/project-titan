import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { Market } from "@prisma/client";

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
   * getMarket route
   *
   * @async
   * @param {?string} [id]
   * @returns {unknown}
   */
  async getMarket(id?: string) {
    if (id) {
      const post = await this.prisma.market.findFirst({
        where: {
          content_id: id,
        },
      });

      if (!post) {
        throw new BadRequestException(`This market post is not found`);
      }

      return post;
    }

    return this.prisma.market.findMany();
  }

  /**
   * Find a similar products by price +-10%
   * and category
   * 
   * @async
   * @param {string} contentId
   * @returns {Promise<Market[]>}
   */
  async findSimilarProducts(contentId: string): Promise<Market[]> {
    const baseProduct = await this.prisma.market.findUnique({
      where: {
        content_id: contentId,
      },
    });
  
    if (!baseProduct) {
      throw new BadRequestException(`Base product not found`);
    }
  
    const similarProducts = await this.prisma.market.findMany({
      where: {
        category: baseProduct.category,
        AND: [
          { price_for_show: { gte: baseProduct.price_for_show } },
          { price_for_show: { lte: baseProduct.price_for_show + 10 } },
        ],
      },
    });
  
    return similarProducts;
  }
}
