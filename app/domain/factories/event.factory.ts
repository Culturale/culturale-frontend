import type { IEvent, EventProps } from '~/domain/entities';
import { Event } from '~/domain/entities';
import { EventDocument } from '~/infrastructure';
import { userFactory } from './user.factory';
import { chatFactory } from './chat.factory';

export function eventFactory(eventDocument: EventDocument): IEvent {
  const props: EventProps = {
    ...eventDocument,
    dataFi: new Date(eventDocument.dataFi),
    dataIni: new Date(eventDocument.dataIni),
    participants: eventDocument.participants.map(userFactory),
    chat: chatFactory(eventDocument.chat),
  };
  return new Event(props);
}
