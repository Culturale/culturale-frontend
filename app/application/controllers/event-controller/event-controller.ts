import { action, makeObservable, observable } from 'mobx';

import { IEvent, IReview, IUser, Review } from '~/domain';
import { eventFactory } from '~/domain';
import type { EventDocument, IInfrastructure } from '~/infrastructure';
import type { IRequestSubject } from '~/observables';
import { RequestSubject } from '~/observables';

import type { IEventController } from './event-controller.interface';

export class EventController implements IEventController {
  public event: IEvent;
  public events: IEvent[];
  public eventsmap: IEvent[];
  private readonly infrastructure: IInfrastructure;

  constructor(infrastructure: IInfrastructure) {
    this.infrastructure = infrastructure;

    makeObservable(this, {
      addParticipant: action,
      event: observable,
      events: observable,
      eventsmap: observable,
      setEvent: action,
      setEvents: action,
      setEventsMap: action,
    });
  }

  public setEvents(events: IEvent[]): void {
    this.events = events;
  }

  public setEvent(event: IEvent): void {
    this.event = event;
  }

  public setEventsMap(events: IEvent[]): void {
    this.eventsmap = events;
  }

  public fetchAllEvents(page: number): IRequestSubject<void> {
    const subject = new RequestSubject<void>();
    subject.startRequest();

    this.infrastructure.api
      .getAllEvents(page)
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

  public fetchEvent(id: string): IRequestSubject<void> {
    const subject = new RequestSubject<void>();
    subject.startRequest();

    this.infrastructure.api
      .getEvent(id)
      .then((res: EventDocument) => {
        const event = eventFactory(res);

        this.setEvent(event);

        subject.completeRequest();
      })
      .catch((e: Error) => {
        subject.failRequest(e);
      });

    return subject;
  }

  public fetchMapEvents(lat1: number, lon1: number, lat2: number, lon2: number): IRequestSubject<void> {
    const subject = new RequestSubject<void>();
    subject.startRequest();

    this.infrastructure.api
      .getMapEvents(lat1, lon1, lat2, lon2)
      .then((res: EventDocument[]) => {
        const events: IEvent[] = [];
        for (const doc of res) {
          const event = eventFactory(doc);
          events.push(event);
        }

        this.setEventsMap(events);

        subject.completeRequest();
      })
      .catch((e: Error) => {
        subject.failRequest(e);
      });

    return subject;
  }

  public async addParticipant(event: IEvent, user: IUser): Promise<void> {
    try{
      await this.infrastructure.api.addParticipant(
        event.id,
        user.username,
      );
      event.updateParticipant(user);
    }catch(error){
      // eslint-disable-next-line no-console
      console.error(error);
    }
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

  
  public async addReview(eventId: string, authorId: string, puntuation: number,  comment?: string):Promise<void>{
    try{
      await this.infrastructure.api.addReview(
        eventId,
        authorId,
        puntuation,
        comment
      );

    const index = this.events.findIndex(e => e._id == eventId);
    const newEvent = this.events[index];
    const newReview: IReview =  new Review({puntuation, comment, authorId, eventId})
    newEvent.updateValoracions(newReview)
    this.events[index] = newEvent;
      
    }catch(error){
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}
