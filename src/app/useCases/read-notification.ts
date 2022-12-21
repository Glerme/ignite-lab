import { Injectable } from '@nestjs/common';

import { NotificationsRespository } from '../repositories/notifications-repositories';

import { NotificationNotFound } from './errors/notification-not-found-error';

interface ReadNotificationsRequest {
  notificationId: string;
}

type ReadNotificationsResponse = void;

@Injectable()
export class ReadNotifications {
  constructor(private notificationsRepository: NotificationsRespository) {}

  async execute(
    request: ReadNotificationsRequest,
  ): Promise<ReadNotificationsResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
