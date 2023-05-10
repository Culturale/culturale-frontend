import type { IEvent, EventProps } from '~/domain/entities';
import { Event } from '~/domain/entities';
import type { EventDocument } from '~/infrastructure';

import { chatFactory } from './chat.factory';
import { userFactory } from './user.factory';

export function eventFactory(eventDocument: EventDocument): IEvent {
  console.log('event factory');
  if (eventDocument.id) {
    console.log(eventDocument.participants.map(userFactory));
    const props: EventProps = {
      ...eventDocument,
      chat: chatFactory(eventDocument.chat),
      dataFi: new Date(eventDocument.dataFi),
      dataIni: new Date(eventDocument.dataIni),
      participants: eventDocument.participants.map(userFactory),
    };
    return new Event(props);
  }
  return null;
}
