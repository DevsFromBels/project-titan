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
   * Get all market products with pagination
   *
   * @async
   * @param {?string} [id]
   * @param {number} [page=1]
   * @param {number} [limit=10]
   * @returns {unknown}
   */
  async getMarket(id?: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    if (id) {
      const post = await this.prisma.market.findFirst({
        where: { content_id: id },
      });

      if (!post) {
        throw new BadRequestException(`This market post is not found`);
      }

      return post;
    }

    const [total, items] = await Promise.all([
      this.prisma.market.count(),
      this.prisma.market.findMany({
        skip,
        take: limit,
        orderBy: { current_shows: "desc" },
      }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Find a similar products by price +-10%
   * and category
   *
   * @async
   * @param {string} contentId
   * @returns {Promise<Market[]>}
   */
  async findSimilarProducts(
    contentId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    items: Market[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const baseProduct = await this.prisma.market.findUnique({
      where: { content_id: contentId },
    });

    if (!baseProduct) {
      throw new BadRequestException(`Base product not found`);
    }

    const skip = (page - 1) * limit;

    const whereClause = {
      category: baseProduct.category,
      NOT: { content_id: contentId }, // Исключаем сам базовый товар
      AND: [
        { price_for_show: { gte: baseProduct.price_for_show * 0.9 } },
        { price_for_show: { lte: baseProduct.price_for_show * 1.1 } },
      ],
    };

    const [total, items] = await Promise.all([
      this.prisma.market.count({ where: whereClause }),
      this.prisma.market.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: [
          { category: "asc" },
          { price_for_show: "asc" },
          { total_shows: "desc" },
        ],
      }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
