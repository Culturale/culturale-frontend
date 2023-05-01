import { Message } from '~/domain/entities';
import { messageFactory } from '~/domain/factories';

describe('messageFactory', () => {
  it('should create a new Message instance with correct atributes', () => {
    const json = {
      _id: '123',
      content: 'test-content',
      userId: 'test-UserID',
      date: '2022-01-01T00:00:00.000Z',
    };

    const message = messageFactory(json);

    expect(message).toBeInstanceOf(Message);
    expect(message._id).toEqual(json._id);
    expect(message.content).toEqual(json.content);
    expect(message.userId).toEqual(json.userId);
    expect(message.date.toISOString()).toEqual(new Date(json.date).toISOString());
  });
});
