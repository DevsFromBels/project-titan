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
    @Query("price_peer_show") pricePeerShow: string
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
      const fileUrl = `/uploads/market/${fileName}`;

      const prodcut = await this.marketService.createProduct(
        fileUrl,
        name,
        user_id,
        pricePeerShow
      );

      return reply.status(200).send(prodcut);
    } catch (err) {
      if (data.file.truncated) {
        // Если файл был обрезан из-за превышения лимита размера
        reply.send("Error occurred");
      } else {
        reply.status(500).send(err._message);
      }
    }
  }

  @Get('/getMarket')
  async getMarket() {
    return await this.marketService.getMarket();
  }
}