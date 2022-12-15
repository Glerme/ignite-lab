import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../app/entities/notification';
import { NotificationsRespository } from '../../../../app/repositories/notifications-repositories';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationsRespository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        category: notification.category,
        content: notification.content.value,
        recipientId: notification.recipientId,
        readAt: notification.readAt,
        createdAt: notification.createdAt,
      },
    });
  }
}
