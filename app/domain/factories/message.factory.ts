import { Message } from '~/domain/entities';
import type { IMessage } from '~/domain/entities';

export function messageFactory(json: any): IMessage {
  const { _id, content, userId, date } = json;

  return new Message(_id, content, userId, new Date(date));
}