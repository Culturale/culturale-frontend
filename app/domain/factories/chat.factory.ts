import { Chat } from '~/domain/entities';
import type { IChat } from '~/domain/entities';
import type { ChatDocument } from '~/infrastructure';

import { messageFactory } from './message.factory';

export function chatFactory(chatDocument: ChatDocument): IChat {
  if (chatDocument.id) {
    const messages = chatDocument.messages.map((messageDoc) =>
      messageFactory(messageDoc),
    );

    return new Chat({
      id: chatDocument.id,
      messages,
    });
  }
  return null;
}
