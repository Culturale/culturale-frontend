import { Chat } from '~/domain/entities';
import { chatFactory } from '~/domain/factories';

describe('chatFactory', () => {
  it('should create a new Chat instance with correct atributes', () => {
    const json = {
      id: '123',
      messages: [
        {
          _id: '456',
          content: 'test-content1',
          date: '2022-01-01T00:00:00.000Z',
          userId: 'test-user1ID',
        },
        {
          _id: '789',
          content: 'test-content2',
          date: '2022-01-02T00:00:00.000Z',
          userId: 'test-user2ID',
        },
      ],
    };

    const chat = chatFactory(json);

    expect(chat).toBeInstanceOf(Chat);
    expect(chat.id).toEqual(json.id);
    expect(chat.messages.length).toEqual(json.messages.length);
    expect(chat.messages[0]._id).toEqual(json.messages[0]._id);
    expect(chat.messages[0].content).toEqual(json.messages[0].content);
    expect(chat.messages[0].userId).toEqual(json.messages[0].userId);
    expect(chat.messages[0].date.toISOString()).toEqual(new Date(json.messages[0].date).toISOString());
    expect(chat.messages[1]._id).toEqual(json.messages[1]._id);
    expect(chat.messages[1].content).toEqual(json.messages[1].content);
    expect(chat.messages[1].userId).toEqual(json.messages[1].userId);
    expect(chat.messages[1].date.toISOString()).toEqual(new Date(json.messages[1].date).toISOString());
  });

  it('should create a new Chat instance with an empty messages array when no messages are provided', () => {
    const json = {
      id: '123',
    };

    const chat = chatFactory(json);

    expect(chat).toBeInstanceOf(Chat);
    expect(chat.id).toEqual(json.id);
    expect(chat.messages.length).toEqual(0);
  });
});
