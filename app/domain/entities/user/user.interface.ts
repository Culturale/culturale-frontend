import { IEvent } from '../event';

export interface IUser {
    username: string;
    name: string;
    password: string;
    email: string;
    profilePicture: string;
    phoneNumber: string;
    usertype: string;
    followers: IUser[];
    followeds: IUser[];
    eventSub: IEvent[];  
    readonly friends: IUser[];
  }
