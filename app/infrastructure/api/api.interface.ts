import type { definitions, paths } from './schema';

export type EventDocument = definitions['event'];
export type UserDocument = definitions['user'];
export type MessageDocument = definitions['message'];
export type ChatDocument = definitions['chat'];
export type GetEventsResponse =
  paths['/events']['get']['responses']['200']['schema'];

export type LoginResponse =
  paths['/login']['post']['responses']['200']['schema'];

export interface IAPI {
  setup: (token: string) => void;

  login: (username: string, password: string) => Promise<LoginResponse>;

  signUp: (
    username: string,
    name: string,
    password: string,
    email: string,
    phoneNumber: string,
    userType: string,
    profilePicture?: string,
  ) => Promise<UserDocument>;

  getAllEvents: () => Promise<EventDocument[]>;

  getChatMessages: (id: string) => Promise<MessageDocument[]>;
}
