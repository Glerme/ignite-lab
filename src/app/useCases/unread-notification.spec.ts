import { NotificationNotFound } from './errors/notification-not-found-error';

import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRespository } from '@test/repositories/in-memory-notifications-repository';
import { UnreadNotification } from './unread-notification';

describe('Unread Notification', () => {
  it('should be able to unread a notification content', async () => {
    const notificationsRepository = new InMemoryNotificationRespository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to read a notification it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationRespository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(async () => {
      return await unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
