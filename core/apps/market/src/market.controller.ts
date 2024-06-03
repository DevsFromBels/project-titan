import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Query,
  UseGuards,
} from "@nestjs/common";
import { pipeline } from "stream";
import * as util from "util";
import { FastifyReply, FastifyRequest } from "fastify";
import * as fs from "fs";
import { MarketService } from "./market.service";
import { extname, join } from "path";
import { uuidv7 } from "uuidv7";
import sharp from 'sharp';


import { HeadersGuard } from "./auth.guard";
const pump = util.promisify(pipeline);

declare module "fastify" {
  interface FastifyRequest {
    user?: { id: string };
  }
}

@Controller()
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get()
  getHello(): string {
    return this.marketService.getHello();
  }

  @UseGuards(HeadersGuard)
  @Post("/create")
  async createRequest(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
    @Query("name") name: string,
    @Query("price_peer_show") pricePeerShow: string,
    @Query("total_shows") totalShows: string
  ) {
    const data = await req.file();
    const fileName = `${uuidv7()}${extname(data.filename)}`;
    const uploadDir = join(__dirname, "..", "..", "uploads", "market");
    const filePath = join(uploadDir, fileName);
    try {
      const user_id = req.user.id;
  
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      await pump(data.file, fs.createWriteStream(filePath));
  
      // Конвертация изображения в WebP
      const webpPath = join(uploadDir, `${fileName}.webp`);
      await sharp(filePath)
       .webp({ quality: 80 }) // Настройка качества изображения
       .toFile(webpPath); // Сохранение результата
  
      const fileUrl = `/uploads/market/${fileName}.webp`;
  
      const product = await this.marketService.createProduct(
        fileUrl,
        name,
        user_id,
        pricePeerShow,
        totalShows
      );
  
      return reply.status(200).send(product);
    } catch (err) {
      if (data.file.truncated) {
        reply.send("Error occurred");
      } else {
        reply.status(500).send(err.message);
      }
    }
  }
  

  /**
   * Controller for get user market data
   *
   * @async
   * @param {string} user_id
   * @returns {unknown}
   */
  @Get('/get-all-user-market-products')
  async getAllUserMarketProducts(@Query("user_id") user_id: string) {
    return this.marketService.getAllUserMarketProducts(user_id);
  }

  /**
   * Controller for get market products
   *
   * @async
   * @returns {unknown}
   */
  @Get("/getMarket")
  async getMarket(
    @Query("id") id: string,
    @Query("page") page: string = "1",
    @Query("limit") limit: string = "10"
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return await this.marketService.getMarket(id, pageNumber, limitNumber);
  }

  @Get('/get-similar-products')
  async getSimilarProducts(
    @Query("content_id") content_id: string,
    @Query("page") page: string = "1",
    @Query("limit") limit: string = "10"
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.marketService.findSimilarProducts(content_id, pageNumber, limitNumber);
  }

  @Get('/get-user-subscriptions')
  async getUserSubscriptions(@Query('token') token: string) {
    return this.marketService.getTokenSubscriptions(token)
  }
}
