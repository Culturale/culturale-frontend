import type { IEvent } from '../event';

import type { IUser } from './user.interface';

export interface UserProps {
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
    this.username = username;
    this.name = name;
    this.email = email;
    this.profilePicture = profilePicture;
    this.phoneNumber = phoneNumber;
    this.usertype = usertype;
    this.followeds = followeds || [];
    this.followers = followers || [];
    this.eventSub = eventSub || [];
  }
}
