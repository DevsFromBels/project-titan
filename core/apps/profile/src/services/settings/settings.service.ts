import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../../prisma/prisma.service";

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getSettings(req: any) {
    const user = req.req.user;
    // console.log(user)

    const userSettings = await this.prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!userSettings) {
      return new BadRequestException(`User not found`);
    }

    const profileSettings = await this.prisma.profile.findFirst({
      where: {
        userId: userSettings.id,
      },
      select: {
        info: true,
        isPublic: true,
        address: true,
        referred_users: true
      },
    });

    if(!profileSettings) {
      return new BadRequestException(`Profile not found`);
    }

    return {
      userSettings,
      profileSettings
    }
  }

  async settingsUpdateUserInfo(req: any, newInfo: string) {
    const user = req.req.user;

    const userSettings = await this.prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!userSettings) {
      return new BadRequestException(`User not found`);
    }

    const profileSettings = await this.prisma.profile.update({
      where: {
        userId: userSettings.id,
      },
      data: {
        info: newInfo
      }
    })

    if(!profileSettings) {
      return new BadRequestException(`Profile not found`);
    }

    return {
      profileSettings
    }
  }
}
