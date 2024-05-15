import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class AvatarsService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Avatars service of https://tianproject.top';
  }

  async uploadUserAvatar(fileUrl: string, userID: string){
    const user = await this.prisma.user.findFirst({
      where: {
        id: userID
      },
      include: {
        avatar: true
      }
    })

    if(!user) {
      return new BadRequestException("User not found")
    }

    if(user.avatar) {
      const oldAvatarPath = join(__dirname, '..', '..', user.avatar.url)
      try {
        await new Promise<void>((resolve, reject) => {
          fs.unlink(oldAvatarPath, (err) => {
            if (err) {
              reject(new BadGatewayException(`Error deleting old avatar file: ${err}`));
            } else {
              resolve();
            }
          });
        });
      
        await this.prisma.avatars.delete({
          where: {
            id: user.avatar.id,
          },
        });
      } catch (err) {
        return err;
      }
    }

    return await this.prisma.avatars.create({
      data: {
        userId: user.id,
        url: fileUrl
      }
    })
  }
}
