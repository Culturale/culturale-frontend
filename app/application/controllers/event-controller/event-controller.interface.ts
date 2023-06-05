import type { IEvent, IUser } from '~/domain';
import type { IRequestSubject } from '~/observables';

export interface IEventController {
  readonly event: IEvent;
  readonly events: IEvent[];
  readonly eventsmap: IEvent[];

  /**
   *
   * @public
   * @description Fetches all events from API and saves them to events property
   */
  fetchAllEvents: (page: number) => IRequestSubject<void>;

  /**
   *
   * @public
   * @description Fetches an specific event from API and saves it to event property
   */
  fetchEvent: (id: string) => IRequestSubject<void>;

  /**
   *
   * @public
   * @description Fetches all map events from API and saves them to eventsmap property
   */
  fetchMapEvents: (lat1: number, Lon1: number, lat2: number, Lon2: number) => IRequestSubject<void>;

  /**
   *
   * @public
   * @description Fetches all messages of an event and updates that event
   */
  fetchEventMessages: (eventId: string) => IRequestSubject<void>;

  /**
   *
   * @public
   * @description Sets events property
   */
  setEvents: (events: IEvent[]) => void;

   /**
   *
   * @public
   * @description Adds participant into an event
   */
  addParticipant: (id: IEvent, username: IUser)=> Promise<void>;


  /**
   *
   * @public
   * @description Adds review into an event
   */
  addReview: (eventId: string, userId: string, puntuation: number,  comment?: string) => Promise<void>;
  
  /**
   *
   * @public
   * @description   Adds review into an event
   */
  reportReview:(reviewId: string) => Promise<void>;
  
}
