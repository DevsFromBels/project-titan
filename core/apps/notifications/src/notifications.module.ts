import { Module } from "@nestjs/common";
import { NotificationsController } from "./notifications.controller";
import { NotificationsGateway } from "./notifications/notifications.gateway";
import { NotificationsService } from "./notifications/notifications.service";
import { PrismaService } from "../../../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [],
  controllers: [],
  providers: [
    NotificationsService,
    NotificationsGateway,
    PrismaService,
    ConfigService,
    JwtService,
  ],
})
export class NotificationsModule {}
