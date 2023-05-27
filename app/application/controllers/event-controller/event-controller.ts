import { action, makeObservable, observable } from 'mobx';

import type { IEvent, IUser } from '~/domain';
import { eventFactory } from '~/domain';
import type { EventDocument, IInfrastructure } from '~/infrastructure';
import type { IRequestSubject } from '~/observables';
import { RequestSubject } from '~/observables';

import type { IEventController } from './event-controller.interface';

export class EventController implements IEventController {
  public events: IEvent[];
  public SearchEvents: IEvent[];
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

  public setEventsSearch(events: IEvent[]): void {
    this.SearchEvents = events;
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

  public fetchEventsByCategory(category: string): IRequestSubject<void> {
    const subject = new RequestSubject<void>();
    subject.startRequest();

    this.infrastructure.api
      .getEventsByCategory(category)
      .then((res: EventDocument[]) => {
        const SearchEvents: IEvent[] = [];
        for (const doc of res) {
          const event = eventFactory(doc);
          SearchEvents.push(event);
        }

        this.setEventsSearch(SearchEvents);

        subject.completeRequest();
      })
      .catch((e: Error) => {
        subject.failRequest(e);
      });

    return subject;
  }

  public fetchEventsByDenominacio(denominacio: string): IRequestSubject<void> {
    const subject = new RequestSubject<void>();
    subject.startRequest();

    this.infrastructure.api
      .getEventsByDenominacio(denominacio)
      .then((res: EventDocument[]) => {
        const SearchEvents: IEvent[] = [];
        for (const doc of res) {
          const event = eventFactory(doc);
          SearchEvents.push(event);
        }

        this.setEventsSearch(SearchEvents);

        subject.completeRequest();
      })
      .catch((e: Error) => {
        subject.failRequest(e);
      });

    return subject;
  }

  public fetchEventsByFilters(denominacio?: string,
    categoria?: string,
    dataIni?: Date,
    dataFi?: Date,
    horari?: string,
    price?: string
  ): IRequestSubject<void> {
    const subject = new RequestSubject<void>();
    subject.startRequest();
  
    this.infrastructure.api
      .fetchEventsByFilters(denominacio, categoria, dataIni, dataFi, horari, price)
      .then((res: EventDocument[]) => {
        const searchEvents: IEvent[] = res.map((doc: EventDocument) => eventFactory(doc));
  
        this.setEventsSearch(searchEvents);
  
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

  
  public async addReview(eventId: string, userId: string, puntuation: number,  comment?: string):Promise<void>{
    try{
      await this.infrastructure.api.addReview(
        eventId,
        userId,
        puntuation,
        comment
      );
    }catch(error){
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}
