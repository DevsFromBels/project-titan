import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../prisma/prisma.service";

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all users notifications
   *
   * @async
   * @param {string} userId
   * @param {?Date} [lastSentAt]
   * @returns {unknown}
   */
  async getNotificationsForUser(userId: string, lastSentAt?: Date) {

    const user = await this.prisma.user.findFirst({
        where: {
            id: userId,
        }
    })

    if(!user) {
        return new BadRequestException("User not found")
    }

    const existingNotifications = await this.prisma.notification.findMany({
      where: {
        userId,
        sentAt: { not: null },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  
    const newNotifications = await this.prisma.notification.findMany({
      where: {
        userId,
        createdAt: lastSentAt ? { gt: lastSentAt } : undefined,
        sentAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  
    if (!newNotifications.length) {
    //   console.log("No new notifications");
      return existingNotifications;
    }
  
    await Promise.all(
      newNotifications.map((notification) =>
        this.prisma.notification.update({
          where: { id: notification.id },
          data: { sentAt: new Date() },
        })
      )
    );
  
    const allNotifications = [...existingNotifications, ...newNotifications];
    // console.log("New notifications:", newNotifications);
    return allNotifications;
  }

  /**
   * Must be deleted in the future, return a first user update
   *
   * @async
   * @param {string} userId
   * @returns {unknown}
   */
  async createFirstNotification(userId: string) {
    return this.prisma.notification.create({
      data: {
        title: "Перове уведомление",
        body: "Это ваше первое уведомление",
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
