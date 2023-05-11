import AsyncStorage from '@react-native-community/async-storage';
import { action, computed, makeObservable, observable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import type { IUser} from '~/domain';
import { userFactory } from '~/domain';
import type { IInfrastructure } from '~/infrastructure';

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

  public setProfilePicture(profilePicture: string): void {
    this.userInfo.profilePicture = profilePicture;
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
