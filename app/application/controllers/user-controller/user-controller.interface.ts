import type { Controller } from '~/application/controllers/controller.interface';
import type { IUser } from '~/domain';

export interface IUserController extends Controller {
  isLoggedIn: boolean | null;
  token: string;
  userInfo: IUser;

  /**
   * Get if login is needed
   * @public
   */
  readonly isLoginNeeded: boolean;

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
   * Sets user info
   * @public
   */
  setUserInfo: (userInfo: IUser) => void;

  setProfilePicture: (profilePicture: string) => void ;

  setUsername: (username: string) => void ;
  setName: (name: string) => void ;
  setEmail: (email: string) => void ;
  setPhoneNumber: (phoneNumber: string) => void ;

}
