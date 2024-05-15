import { BadGatewayException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { Profile, UserProfile } from "./entities/profile.entitie";

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string): Promise<UserProfile> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  
    if (!user) {
      throw new BadGatewayException("User not found");
    }
  
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    });
  
    const avatar = await this.prisma.avatars.findFirst({
      where: {
        userId: user.id,
      },
    });
  
    let avatar_url = '';
    if (avatar && avatar.url) {
      avatar_url = avatar.url;
    }
  
    return {
      user: user,
      info: profile.info,
      isPublic: profile.isPublic,
      avatar_url: avatar_url,
    };
  }
  

  async searchUserProfile(
    userName: string,
    limit?: number
  ): Promise<{ users: Profile[]; isPublic: boolean[] | null }> {
    const profiles = await this.prisma.profile.findMany({
      where: {
        user: {
          name: {
            contains: userName,
            mode: "insensitive",
          },
        },
        isPublic: true,
      },
      take: limit || 5,
      include: {
        user: true,
      },
    });

    return {
      users: profiles.map((profile) => profile.user),
      isPublic: profiles.map((profile) => profile.isPublic),
    };
  }

async getAllUsersProfiles(limit: string, page?: number): Promise<{ users: Profile[] }> {
  const users = await this.prisma.user.findMany({
    take: Number(limit),
    skip: page ? Number(page) * Number(limit) : undefined, 
    include: {
      profile: true,
    },
  });

  return { users };
}

  async getSettings(userName: string) {}

  async updateSettings(settings) {}
}
