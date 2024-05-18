import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { NotificationsService } from "./notifications.service";
import { setInterval } from "timers";

export interface SocketWithLastSentAt extends Socket {
  lastSentAt?: Date;
}

@WebSocketGateway({ cors: true })
// @UseGuards(HeadersGuard)
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private connectedUsers: { [userId: string]: Socket } = {};

  constructor(private notificationsService: NotificationsService) {
    this.sendNotifications();
  }

  handleConnection(client: Socket, ...args: any[]) {
    const userId = client.handshake.auth.userId;

    if (!userId) {
      client.disconnect();
      return;
    }

    this.connectedUsers[userId] = client;
    console.log(`User ${userId} connected`);

    this.notificationsService.getNotificationsForUser(userId);
  }

  handleDisconnect(client: Socket) {
    const userId = this.getDisconnectedUserId(client);
    delete this.connectedUsers[userId];
    console.log(`User ${userId} disconnected`);
  }

  private getDisconnectedUserId(client: Socket): string {
    const userId = Object.entries(this.connectedUsers).find(
      ([, socket]) => socket === client
    )?.[0];
    return userId;
  }

  private async sendNotifications() {
    setInterval(async () => {
      for (const userId in this.connectedUsers) {
        const client = this.connectedUsers[userId] as SocketWithLastSentAt;
        const lastSentAt = client.lastSentAt || new Date(0); // Начальное значение для первой итерации
  
        const newNotifications = await this.notificationsService.getNotificationsForUser(userId, lastSentAt);
        if (typeof newNotifications !== 'object' || Array.isArray(newNotifications) && newNotifications.length > 0) {
          client.emit("notifications", newNotifications);
          client.lastSentAt = newNotifications[newNotifications.length - 1].createdAt;
        }
      }
    }, 5000);
  }
  
}
