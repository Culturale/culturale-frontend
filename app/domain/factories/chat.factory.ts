import {  Chat } from '~/domain/entities';
import type { IChat } from '~/domain/entities';

export function chatFactory(json: any): IChat {
  const messages = json.messages || [];

  return new Chat(json.id, messages);
}