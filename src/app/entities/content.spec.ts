import { Content } from './content';

describe('Notification Content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content(
      'Voce  recebeu uma nova solicitação de amizade',
    );
    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('aaa')).toThrow();
  });

  test('should not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('aaa'.repeat(241))).toThrow();
  });
});
