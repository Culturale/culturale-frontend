import type { ManagedUpload } from 'aws-sdk/clients/s3';
import type { ImagePickerAsset } from 'expo-image-picker';

import type { Controller } from '~/application/controllers/controller.interface';
import type { IEvent, IUser } from '~/domain';
import { IRequestSubject } from '~/observables';

export interface IUserController extends Controller {
  isLoggedIn: boolean | null;
  token: string;
  userInfo: IUser;
  readonly users: IUser[];

  /**
   * Get if login is needed
   * @public
   */
  readonly isLoginNeeded: boolean;


  /**
   *
   * @public
   * @description Fetches all events from API and saves them to events property
   */
  fetchAllUsers: () => IRequestSubject<void>;


  /**
   * Get if login is needed
   * @public
   */
  setup: () => Promise<void>;

  /**
   * Sets isLoggedIn prop
   * @public
   */
  setIsLoggedIn: (state: boolean) => void;

  /**
   * Remove token
   * @public
   */
  removeToken(): void;

  /**
   * Sets token prop
   * @public
   */
  setToken: (token: string) => void;

  /**
   * Modifies user info
   * @public
   */
  modifyUser: (
    username: string,
    name: string,
    email: string,
    phoneNumber: string,
    usertype: string,
    profilePicture?: string,
  ) => Promise<void>;

  /**
   * Modifies user followers
   * @public
   */
  removeFriend(userUsername:string, friendUsername: string): Promise<void>;
 
  /**
     * Modifies user followers
     * @public
     */
  addFriend(userUsername:string, friendUser: IUser): Promise<void>;

  /**
   * Sets user info
   * @public
   */
  setUserInfo: (userInfo: IUser) => void;
  uploadPhoto: (asset: ImagePickerAsset) => Promise<ManagedUpload.SendData> ;

  setProfilePicture: (profilePicture: string) => void ;

  setUsername: (username: string) => void ;
  setName: (name: string) => void ;
  addEventSub: (event: IEvent) => void;
  setEmail: (email: string) => void ;
  setPhoneNumber: (phoneNumber: string) => void ;
}
