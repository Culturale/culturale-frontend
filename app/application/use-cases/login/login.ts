import type { IUserController } from '~/application/controllers';
import { userFactory } from '~/domain';
import type { IInfrastructure, LoginResponse } from '~/infrastructure';
import type { IRequestSubject } from '~/observables';
import { RequestSubject } from '~/observables';

export type Login = {
  args: [username: string, password: string];
  responseType: IRequestSubject<void>;
};

/**
 *  @param infrastructure
 *  @param userController
 *  @description Logs in the user to Culturale API
 */
export function login(
  infrastructure: IInfrastructure,
  userController: IUserController,
  ...args: Login['args']
): Login['responseType'] {
  const [username, password] = args;
  const subject = new RequestSubject<void>('Login');
  subject.startRequest();
  infrastructure.api
    .login(username, password)
    .then((res: LoginResponse) => {
      const { token, user } = res;
      const userInfo = userFactory(user);
      infrastructure.api.setup(token);
      userController.setUserInfo(userInfo);
      userController.setToken(token);
      userController.setIsLoggedIn(true);
      subject.completeRequest();
    })
    .catch((e) => {
      subject.failRequest(e);
    });

  return subject;
}
