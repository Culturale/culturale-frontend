import { Buffer } from 'buffer';

import AsyncStorage from '@react-native-community/async-storage';
import type { ManagedUpload } from 'aws-sdk/clients/s3';
import type { ImagePickerAsset } from 'expo-image-picker';
import { action, computed, makeObservable, observable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { IEvent, IUser, User, eventFactory, userFactory } from '~/domain';
import type { EventDocument, IInfrastructure, UserDocument } from '~/infrastructure';
import type { IRequestSubject } from '~/observables';
import { RequestSubject } from '~/observables';

import type { IUserController } from './user-controller.interface';

export enum DriverRequests {
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  UserInfo = 'USER_INFO',
  TotalCash = 'TOTAL_CASH',
}

export class UserController implements IUserController {
  public isLoggedIn: boolean | null = null;
  public token: string;
  public userInfo: IUser;
  public users: IUser[];
  private infrastructure: IInfrastructure;

  constructor(infrastructure: IInfrastructure) {
    this.infrastructure = infrastructure;
    makeObservable(this, {
      isLoggedIn: observable,
      isLoginNeeded: computed,
      modifyUser: action,
      removeToken: action,
      setEmail: action,
      setIsLoggedIn: action,
      setName: action,
      setPhoneNumber: action,
      setProfilePicture: action,
      setToken: action,
      setUserInfo: action,
      setUsername: action,
      token: observable,
      uploadPhoto: action,
      userInfo: observable,
      users: observable,
      setUsers: action,
    });
  }

  public setPreferits(events: IEvent[]): void {
    this.userInfo.preferits = events;
  }

  public setUsers(users: IUser[]): void {
    this.users = users;
  }


  public fetchAllFavourites(): IRequestSubject<void> {
    const username = this.userInfo.username;
    const subject = new RequestSubject<void>();
    subject.startRequest();

    this.infrastructure.api
      .getUserPreferits(username)
      .then((res: EventDocument[]) => {
        const events: IEvent[] = [];
        for (const doc of res) {
          const event = eventFactory(doc);
          events.push(event);
        }
        this.setPreferits(events);

        subject.completeRequest();
      })
      .catch((e: Error) => {
        subject.failRequest(e);
      });

    return subject;
  }

  public async setup() {
    await makePersistable(
      this,
      {
        name: 'UserController',
        properties: ['isLoggedIn', 'token', 'userInfo'],
        storage: AsyncStorage,
      },
      { fireImmediately: true },
    );
  }

  public async removeFriend(userUsername: string, friendUsername:string): Promise<void> {
     await this.infrastructure.api.removeFriend(userUsername, friendUsername);
    const index = this.userInfo.followeds.findIndex(user => user.username === friendUsername);
    if (index !== -1) {
      this.userInfo.followeds.splice(index, 1);
    }
  }

  public async addFavourite(id: string, username: string): Promise<void> {
    await this.infrastructure.api.addFavourite(id, username);
  }

  public async removeFavourite(id: string, username: string): Promise<void> {
    await this.infrastructure.api.removeFavourite(id, username);
   const index = this.userInfo.preferits.findIndex(event => event.id === id);
   if (index !== -1) {
     this.userInfo.preferits.splice(index, 1);
   }
 }

  public setUserFollowers(token: string): void {
    this.token = token;
  }
  
  public async modifyUser(
    username: string,
    name: string,
    email: string,
    phoneNumber: string,
    usertype: string,
    profilePicture?: string,
  ): Promise<void> {
    const res = await this.infrastructure.api.editUser(
      username,
      name,
      email,
      phoneNumber,
      usertype,
      profilePicture,
    );
    const user = userFactory(res);
    this.setUserInfo(user);
  }

  public fetchAllUsers(username: string): IRequestSubject<void> {
    const subject = new RequestSubject<void>();
    subject.startRequest();
    this.infrastructure.api
    .getAllUsers(username)
    .then((res: UserDocument[]) => {
      const users: IUser[] = [];
      for (const doc of res) {
        const user = userFactory(doc);
        users.push(user);
      }
      this.setUsers(users);

      subject.completeRequest();
    })
    .catch((e: Error) => {
      subject.failRequest(e);
    });

    return subject;
  }

  public get isLoginNeeded(): boolean {
    return !this.token;
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public removeToken(): void {
    this.token = null;
  }
  
  public async uploadPhoto (asset: ImagePickerAsset): Promise<ManagedUpload.SendData> {
    const file = {
      data: asset.base64,
      name: this.userInfo.username,
      type: 'image/png',
    };
    const buffer = Buffer.from(asset.base64, 'base64');
    return await this.infrastructure.services.aws3.uploadFile(buffer,file);
  }

  public setProfilePicture(profilePicture: string): void {
    this.userInfo.profilePicture = profilePicture;
  }

  public addEventSub(event: IEvent): void {
    this.userInfo.addEventSub(event);
  }

  public setUsername(username: string): void {
    this.userInfo.username = username;
  }

  public setName(name: string): void {
    this.userInfo.name = name;
  }

  public setEmail(email: string): void {
    this.userInfo.email = email;
  }

  public setPhoneNumber(phoneNumber: string): void {
    this.userInfo.phoneNumber = phoneNumber;
  }

  public setIsLoggedIn(state: boolean): void {
    this.isLoggedIn = state;
  }

  public setUserInfo(user: IUser): void {
    this.userInfo = user;
  }
}
