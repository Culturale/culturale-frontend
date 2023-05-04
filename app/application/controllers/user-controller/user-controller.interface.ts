import type { Controller } from '~/application/controllers/controller.interface';
import type { IUser } from '~/domain';

export interface IUserController extends Controller {
  isLoggedIn: boolean | null;
  token: string;
  user: IUser;

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
   * Sets user info
   * @public
   */
  setUserInfo: (userInfo: IUser) => void;
}
