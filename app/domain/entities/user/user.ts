import { action, makeObservable, observable } from 'mobx';

import type { IEvent } from '../event';

import type { IUser } from './user.interface';

export interface UserProps {
  _id: string;
  username: string;
  name: string;
  email: string;
  profilePicture: string;
  phoneNumber: string;
  usertype: string;
  followeds?: IUser[];
  followers?: IUser[];
  eventSub?: IEvent[];
}

export class User implements IUser {
  public _id: string;
  public username: string;
  public name: string;
  public email: string;
  public profilePicture: string;
  public phoneNumber: string;
  public usertype: string;
  public followers: IUser[];
  public followeds: IUser[];
  public eventSub: IEvent[];

  constructor(props: UserProps) {
    const {
      _id,
      username,
      name,
      email,
      profilePicture,
      phoneNumber,
      usertype,
      followeds,
      followers,
      eventSub,
    } = props;
    this._id = _id;
    this.username = username;
    this.name = name;
    this.email = email;
    this.profilePicture = profilePicture;
    this.phoneNumber = phoneNumber;
    this.usertype = usertype;
    this.followeds = followeds || [];
    this.followers = followers || [];
    this.eventSub = eventSub || [];

    makeObservable(this, {
      addEventSub: action,
      eventSub: observable,
    });
  }

  public addEventSub(event: IEvent): void{
    this.eventSub.push(event);
  }
}
