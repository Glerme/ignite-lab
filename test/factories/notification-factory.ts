import { Content } from '@app/entities/content';
import { Notification, NotificationProps } from '@app/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social2',
    content: new Content('nova solicitacao'),
    recipientId: 'recipient-2',
    ...override,
  });
}
