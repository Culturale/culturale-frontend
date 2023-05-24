import { action, makeObservable, observable } from 'mobx';

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
  preferits?: IEvent[];
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
  public preferits: IEvent[];
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
      preferits,
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
    this.preferits = preferits || [];
    this.eventSub = eventSub || [];

    makeObservable(this, {
      addEventSub: action,
      eventSub: observable,
    });
  }

  public addEventSub(event: IEvent): void{
    this.eventSub.push(event);
  }
  
  public get friends(): IUser[] {
    const { followers, followeds } = this;
    const amigos: IUser[] = followers.filter(user => {
      const userString = JSON.stringify(user);
      return followeds.some(followed => {
        const followedString = JSON.stringify(followed);
        return userString === followedString;
      });
    });
    return amigos;
  }
  
  
}
