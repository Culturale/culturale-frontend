import { action, makeObservable, observable } from 'mobx';

import type { IEvent, IUser } from '~/domain';
import { eventFactory } from '~/domain';
import type { EventDocument, IInfrastructure } from '~/infrastructure';
import type { IRequestSubject } from '~/observables';
import { RequestSubject } from '~/observables';

import type { IEventController } from './event-controller.interface';

export class EventController implements IEventController {
  public events: IEvent[];
  private readonly infrastructure: IInfrastructure;

  constructor(infrastructure: IInfrastructure) {
    this.infrastructure = infrastructure;

    makeObservable(this, {
      addParticipant: action,
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
        const events: IEvent[] = [];
        for (const doc of res) {
          const event = eventFactory(doc);
          events.push(event);
        }

        this.setEvents(events);

        subject.completeRequest();
      })
      .catch((e: Error) => {
        subject.failRequest(e);
      });

    return subject;
  }

  public async addParticipant(event: IEvent, user: IUser): Promise<void> {
    await this.infrastructure.api.addParticipant(
      event.id,
      user.username,
    );
    const eventToBeMod: IEvent = this.events[(this.events.indexOf(event))];
    eventToBeMod.updateParticipant(user);
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
