import { Message } from '~/domain/entities';
import type { IMessage } from '~/domain/entities';
import type { MessageDocument } from '~/infrastructure';

export function messageFactory(messageDocument: MessageDocument): IMessage {
  return new Message({
    ...messageDocument,
    date: new Date(messageDocument.date),
  });
}
