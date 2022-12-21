import { ReadNotifications } from './read-notification';

import { NotificationNotFound } from './errors/notification-not-found-error';

import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRespository } from '@test/repositories/in-memory-notifications-repository';

describe('Read Notification', () => {
  it('should be able to create a notification content', async () => {
    const notificationsRepository = new InMemoryNotificationRespository();
    const readNotification = new ReadNotifications(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationRespository();
    const readNotification = new ReadNotifications(notificationsRepository);

    expect(async () => {
      return await readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
