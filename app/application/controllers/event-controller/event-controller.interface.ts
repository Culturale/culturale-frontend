import type { IEvent, IUser } from '~/domain';
import type { IRequestSubject } from '~/observables';

export interface IEventController {
  readonly events: IEvent[];

  /**
   *
   * @public
   * @description Fetches all events from API and saves them to events property
   */
  fetchAllEvents: () => IRequestSubject<void>;

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

}
