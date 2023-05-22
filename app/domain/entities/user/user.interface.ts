import type { IEvent } from '../event';

export interface IUser {
  _id: string;
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
