import type { IEvent } from '~/domain';
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
   * @description Fetches events by category from API and saves them to events property
   */
  fetchEventsByCategory: (category: string) => IRequestSubject<void>;

  /**
   *
   * @public
   * @description Fetches events by denominacio from API and saves them to events property
   */
  fetchEventsByDenominacio: (denominacio: string) => IRequestSubject<void>;

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
}
