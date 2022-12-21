import { Notification } from '@app/entities/notification';
import { CountRecipientNotifications } from './count-recipient-notifications';

import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRespository } from '@test/repositories/in-memory-notifications-repository';

describe('Count Recipient Notifications', () => {
  it('should be able to Count Recipient Notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRespository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
