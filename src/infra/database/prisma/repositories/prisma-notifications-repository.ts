import { Injectable } from '@nestjs/common';

import { Notification } from '@app/entities/notification';
import { NotificationsRespository } from '@app/repositories/notifications-repositories';

import { PrismaService } from '../prisma.service';

import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationRepository implements NotificationsRespository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notifications = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notifications) return null;

    return PrismaNotificationMapper.toDomain(notifications);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        id: recipientId,
      },
    });

    return count;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    });

    if (!notifications) return null;

    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}
