import type { definitions } from './schema';

type Event = definitions['event'];
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
  ) => Promise<void>;

  getAllEvents: () => Promise<Event[]>;
}
