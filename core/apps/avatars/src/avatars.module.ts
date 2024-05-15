import { Module } from "@nestjs/common";
import { AvatarsController } from "./avatars.controller";
import { AvatarsService } from "./avatars.service";
import { PrismaService } from "../../../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [],
  controllers: [AvatarsController],
  providers: [AvatarsService, PrismaService, JwtService, ConfigService],
})
export class AvatarsModule {}
