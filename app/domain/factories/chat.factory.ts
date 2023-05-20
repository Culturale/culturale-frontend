import { Chat } from '~/domain/entities';
import type { IChat } from '~/domain/entities';
import type { ChatDocument } from '~/infrastructure';

import { messageFactory } from './message.factory';

export function chatFactory(chatDocument: ChatDocument): IChat {
  if (chatDocument._id) {
    const messages = chatDocument.messages.map((messageDoc) =>
      messageFactory(messageDoc),
    );

    return new Chat({
      _id: chatDocument._id,
      messages,
    });
  }
  return null;
}
