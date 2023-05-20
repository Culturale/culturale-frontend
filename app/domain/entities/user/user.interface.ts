import type { IEvent } from '../event';

export interface IUser {
  username: string;
  name: string;
  email: string;
  profilePicture: string;
  phoneNumber: string;
  usertype: string;
  followers: IUser[];
  followeds: IUser[];
  eventSub: IEvent[];

  addEventSub: (event: IEvent) => void;
}
