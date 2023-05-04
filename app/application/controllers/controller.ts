import type { IEventController } from './event-controller';
import type { IUserController } from './user-controller';

export type Controllers = {
  UserController: IUserController;
  EventController: IEventController;
};
