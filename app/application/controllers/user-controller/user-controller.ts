import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, computed, makeObservable, observable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import type { IUser } from '~/domain';

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

  constructor(token?: string) {
    this.token = token;

    makeObservable(this, {
      isLoggedIn: observable,
      isLoginNeeded: computed,
      removeToken: action,
      setIsLoggedIn: action,
      setToken: action,
      setUserInfo: action,
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
      { fireImmediately: true }
    );
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

  public setIsLoggedIn(state: boolean): void {
    this.isLoggedIn = state;
  }

  public setUserInfo(user: IUser): void {
    this.userInfo = user;
  }
}
