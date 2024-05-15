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
import { AvatarsService } from "./avatars.service";
import { extname, join } from "path";
import { uuidv7 } from "uuidv7";
import { HeadersGuard } from "./guards/auth.guard";
const pump = util.promisify(pipeline);

declare module "fastify" {
  interface FastifyRequest {
    user?: { id: string };
  }
}

@Controller()
export class AvatarsController {
  constructor(private readonly avatarService: AvatarsService) {}
  
  @Get()
  getHello(): string {
    return this.avatarService.getHello();
  }

  @UseGuards(HeadersGuard)
  @Post("/upload")
  async createRequest(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
  ) {
    const data = await req.file();
    const fileName = `${uuidv7()}${extname(data.filename)}`;
    const uploadDir = join(__dirname, "..", "..", "uploads", "avatars");
    const filePath = join(uploadDir, fileName);
    try {
      const user_id = req.user.id;

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      await pump(data.file, fs.createWriteStream(filePath));
      const fileUrl = `/uploads/avatars/${fileName}`;

      const avatar = await this.avatarService.uploadUserAvatar(
        fileUrl,
        user_id,
      );

      return reply.status(200).send(avatar);
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
