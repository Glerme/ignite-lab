import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRespository } from '../repositories/notifications-repositories';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRespository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { category, content, recipientId } = request;

    const notification = new Notification({
      category,
      content: new Content(content),
      recipientId,
    });

    //Persistir no banco
    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
