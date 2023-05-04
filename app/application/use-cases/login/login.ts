import type { IUserController } from '~/application/controllers';
import type { IInfrastructure } from '~/infrastructure';
import type { IRequestSubject } from '~/observables';
import { RequestSubject } from '~/observables';

export type Login = {
  args: [username: string, password: string];
  responseType: IRequestSubject<void>;
};

/**
 *  @param infrastructure
 *  @param driverController
 *  @param routeController
 *  @description Logs in the user to Auth0, requests Firebase credentials to BE, logs the user into Firebase and
 * asks RouteController to subscribe to route updates
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
    .then((token: string) => {
      userController.setToken(token);
      subject.completeRequest();
    })
    .catch((e) => {
      subject.failRequest(e);
    });

  return subject;
}
