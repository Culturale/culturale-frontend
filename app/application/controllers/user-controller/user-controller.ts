import { Buffer } from 'buffer';

import AsyncStorage from '@react-native-community/async-storage';
import type { ManagedUpload } from 'aws-sdk/clients/s3';
import type { ImagePickerAsset } from 'expo-image-picker';
import { action, computed, makeObservable, observable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import type { IEvent, IUser} from '~/domain';
import { userFactory } from '~/domain';
import type { IInfrastructure, UserDocument } from '~/infrastructure';

import type { IUserController } from './user-controller.interface';
import { IRequestSubject, RequestSubject } from '~/observables';

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
  private infrastructure: IInfrastructure;
  public users: IUser[];

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
    });
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
    // Se quita b de la lista de seguidos de a
     await this.infrastructure.api.removeFriend(userUsername, friendUsername);
    const index = this.userInfo.followeds.findIndex(user => user.username === friendUsername);
    if (index !== -1) {
      this.userInfo.followeds.splice(index, 1);
    }
    // Se quita a de la lista de seguidores de b
    const index2 = this.users.findIndex(user => user.username === friendUsername);
    if (index2 !== -1) {
      const newUsers = [...this.users];
      const friend = newUsers[index2];
      const newFollowers = friend.followers.filter(follower => follower.username !== userUsername);
      friend.followers = newFollowers;
      newUsers[index2] = friend;
      this.setUsers(newUsers);
    }

    
  }
  public async addFriend(userUsername: string, friendUser: IUser): Promise<void> {
    await this.infrastructure.api.addFriend(userUsername, friendUser.username);
  // añadimos B a los seguidos de A
    const index = this.userInfo.followeds.findIndex(user => user.username === friendUser.username);
    if (index === -1) {
      this.userInfo.followeds.push(friendUser);
    }
  // añadimos A a los seguidores de B
    const friendIndex = this.users.findIndex(user => user.username === friendUser.username);
    if (friendIndex !== -1) {
      const newUsers = [...this.users];
      const newFollowers = [...friendUser.followers, this.userInfo];
      friendUser.followers = newFollowers;
      newUsers[friendIndex] = friendUser;
      this.setUsers(newUsers);
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
  public fetchAllUsers(): IRequestSubject<void> {
    const subject = new RequestSubject<void>();
    subject.startRequest();

    this.infrastructure.api
      .getAllUsers()
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
    console.log("DEVOLVEMOS EL SUBJECT", subject)
    return subject;
  }
  
  public setUsers(users: IUser[]): void {
    this.users = users;
  }
  
}




// Si a y b son amigos 
// a.followeds = b
// a.followers = b
// b.followeds = a
// b.followers = a
// si a deja de seguir a b
// a.followeds = 
// a.followers = b
// b.followeds = a
// b.followers = 
