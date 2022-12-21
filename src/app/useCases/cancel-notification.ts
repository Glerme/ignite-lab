import { Injectable } from '@nestjs/common';

import { NotificationsRespository } from '../repositories/notifications-repositories';

import { NotificationNotFound } from './errors/notification-not-found-error';

interface CancelNotificationsRequest {
  notificationId: string;
}

type CancelNotificationsResponse = void;

@Injectable()
export class CancelNotifications {
  constructor(private notificationsRepository: NotificationsRespository) {}

  async execute(
    request: CancelNotificationsRequest,
  ): Promise<CancelNotificationsResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
