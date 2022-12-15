import { Notification } from '../../src/app/entities/notification';
import { NotificationsRespository } from '../../src/app/repositories/notifications-repositories';

export class InMemoryNotificationRespository
  implements NotificationsRespository
{
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
