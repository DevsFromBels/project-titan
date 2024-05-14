import { Controller, Get, Post, Req, Res, Body, Param } from "@nestjs/common";
import { pipeline } from "stream";
import * as util from "util";
import { FastifyReply, FastifyRequest } from "fastify";
import * as fs from "fs";
import { MarketService } from "./market.service";
import { extname, join } from "path";
// import { v4 as uuidv4 } from 'uuid';
import { uuidv7 } from "uuidv7";
const pump = util.promisify(pipeline);
@Controller()
export class MarketController {
  constructor(private readonly marketService: MarketService) {}
  @Get()
  getHello(): string {
    return this.marketService.getHello();
  }

  @Post("/create/:userID/:name")
  async createRequest(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
    @Param('userID') userID: string,
    @Param('name') name: string,
  ) {
    const data = await req.file();
    const fileName = `${uuidv7()}${extname(data.filename)}`;
    const uploadDir = join(__dirname, "..", "..", "uploads", "market");
    const filePath = join(uploadDir, fileName);
    try {
      // Создаем папку, если она не существует
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      await pump(data.file, fs.createWriteStream(filePath));
      const fileUrl = `/uploads/market/${fileName}`;
      // console.log('UserId:', userId);
      // console.log('Name:', name);
      return reply.status(200).send({
        fileUrl,
        userID,
        name,
      });
    } catch (err) {
      if (data.file.truncated) {
        // Если файл был обрезан из-за превышения лимита размера
        reply.send("Error occurred");
      } else {
        reply.status(500).send(err._message);
      }
    }
  }
}
