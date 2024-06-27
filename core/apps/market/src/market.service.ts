import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { Market } from "@prisma/client";
import { MarketIdService } from "./market-id/market-id.service";

@Injectable()
export class MarketService {
  constructor(
    private readonly prisma: PrismaService,
    private marketID: MarketIdService
  ) {}

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
   * @param {string} link
   * @param {string} category
   * @returns {unknown}
   */
  async createProduct(
    image: string,
    name: string,
    userID: string,
    price_per_show: string,
    total_shows: string,
    link: string,
    category: string,
    region: string
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

    if (!link) {
      return new BadRequestException("Link is not found");
    }

    return await this.prisma.moderation.create({
      data: {
        text: name,
        photo: image,
        link: link,
        user_id: userID,
        price_for_show: parseFloat(price_per_show),
        category: category,
        total_shows: parseInt(total_shows),
        region: region,
      },
    });

    // return await this.prisma.market.create({
    //   data: {
    //     content: image,
    //     name: name,
    //     link: link,
    //     user_id: userID,
    //     price_for_show: parseFloat(price_per_show),
    //     total_shows: parseInt(total_shows),
    //     category: category,
    //     current_shows: 0,
    //   },
    // });
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
      return this.marketID.getMarketPostByID(id);
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

  /**
   * Get top products by views
   *
   * @async
   * @param {number} [limit=5]
   * @returns {Promise<{items: Market[], total: number}>}
   */
  async getTopProductsByViews(
    limit: number = 5
  ): Promise<{ items: Market[]; total: number }> {
    const [total, items] = await Promise.all([
      this.prisma.market.count(),
      this.prisma.market.findMany({
        orderBy: [{ current_shows: "desc" }],
        take: limit,
      }),
    ]);

    return {
      items,
      total,
    };
  }

  /**
   * Return moderaions
   *
   * @param {string} moderationID
   * @returns {*}
   */
  getModerations(moderationID: string) {
    if (moderationID) {
      return this.prisma.moderation.findFirst({
        where: {
          moderation_id: moderationID,
        },
      });
    }

    return this.prisma.moderation.findMany();
  }

  async addCurrentShow(user: string, content_id: string, ip: string) {
    const currentUser = await this.prisma.user.findFirst({
      where: {
        id: user,
      },
    });
  
    if (!currentUser) {
      throw new BadRequestException("User not found");
    }
  
    const currentPost = await this.prisma.market.findFirst({
      where: {
        content_id: content_id,
      },
    });
  
    if (!currentPost) {
      throw new BadRequestException("Post not found");
    }
  
    const adView = await this.prisma.adView.findFirst({
      where: {
        ipAddress: ip,
        market: {
          content_id: content_id,
        },
      },
    });
  
    if (!adView) {
      await this.prisma.adView.create({
        data: {
          ipAddress: ip,
          market: {
            connect: {
              content_id: content_id,
            },
          },
        },
      });
  
      await this.prisma.market.update({
        where: {
          content_id: content_id,
        },
        data: {
          current_shows: {
            increment: 1,
          },
        },
      });
  
      const updatedPost = await this.prisma.market.findFirst({
        where: {
          content_id: content_id,
        },
      });
  
      if (updatedPost.current_shows >= updatedPost.total_shows) {
        await this.prisma.market.delete({
          where: {
            content_id: content_id,
          },
        });
      }

      await this.prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          balance: {
            increment: 0.015,
          },
        },
      });
    }
  }
}
