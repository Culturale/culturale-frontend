import type { definitions } from './schema';

export type EventDocument = definitions['event'];
export type UserDocument = definitions['user'];
export type MessageDocument = definitions['message'];
export type ChatDocument = definitions['chat'];
export interface IAPI {
  setup: (token: string) => void;

  login: (username: string, password: string) => Promise<string>;

  signUp: (
    username: string,
    name: string,
    password: string,
    email: string,
    profilePicture: string,
    userType: string,
  ) => Promise<UserDocument>;

  getAllEvents: () => Promise<EventDocument[]>;

  getChatMessages: (id: string) => Promise<MessageDocument[]>;
}
