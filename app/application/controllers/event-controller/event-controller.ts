import { action, makeObservable, observable } from 'mobx';

import type { IEvent} from '~/domain';
import { eventFactory } from '~/domain';
import type { EventDocument, IInfrastructure } from '~/infrastructure';
import type { IRequestSubject} from '~/observables';
import { RequestSubject } from '~/observables';

import type { IEventController } from './event-controller.interface';



export class EventController implements IEventController {
  public events: IEvent[];
  private readonly infrastructure: IInfrastructure;

  constructor(infrastructure: IInfrastructure) {
    this.infrastructure = infrastructure;

    makeObservable(this, {
      events: observable,
      setEvents: action,
    });
  }

  public setEvents(events: IEvent[]): void {
    this.events = events;
  }

  public fetchAllEvents(): IRequestSubject<void> {
    const subject = new RequestSubject<void>();
    subject.startRequest();

    this.infrastructure.api
      .getAllEvents()
      .then((res: EventDocument[]) => {
        const events: IEvent[] = res.map((document) => eventFactory(document));

        this.setEvents(events);

        subject.completeRequest();
      })
      .catch((e: Error) => {
        subject.failRequest(e);
      });

    return subject;
  }

  public fetchEventMessages(eventId: string): IRequestSubject<void> {
    const subject = new RequestSubject<void>();
    subject.startRequest();

    this.infrastructure.api
      .getChatMessages(eventId)
      .then((_res) => {
        subject.completeRequest();
      })
      .catch((e: Error) => {
        subject.failRequest(e);
      });

    return subject;
  }
}
