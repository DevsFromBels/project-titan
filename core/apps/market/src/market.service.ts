import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";

@Injectable()
export class MarketService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return "Hello World!";
  }

  async createProduct(
    image: string,
    name: string,
    userID: string,
    price_per_show: string
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

    if(!price_per_show) {
      return new BadRequestException("Price not found")
    }

    return await this.prisma.market.create({
      data: {
        content: image,
        name: name,
        link: "",
        user_id: userID,
        price_for_show: parseFloat(price_per_show),
      },
    });
  }

  async getMarket() {
    return this.prisma.market.findMany();
  }
}
