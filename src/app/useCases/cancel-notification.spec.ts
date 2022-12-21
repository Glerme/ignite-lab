import { Notification } from '@app/entities/notification';
import { CancelNotifications } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found-error';

import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRespository } from '@test/repositories/in-memory-notifications-repository';

describe('Send Notification', () => {
  it('should be able to create a notification content', async () => {
    const notificationsRepository = new InMemoryNotificationRespository();
    const cancelNotifcation = new CancelNotifications(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotifcation.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationRespository();
    const cancelNotifcation = new CancelNotifications(notificationsRepository);

    expect(async () => {
      return await cancelNotifcation.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
