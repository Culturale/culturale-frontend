import type { IUserController } from '~/application/controllers';
import { User } from '~/domain';
import type { IInfrastructure, UserDocument } from '~/infrastructure';
import type { IRequestSubject } from '~/observables';
import { RequestSubject } from '~/observables';

export type Signup = {
  args: [
    username: string,
    name: string,
    password: string,
    email: string,
    phoneNumber: string,
    userType: string,
    profilePicture?: string
  ];
  responseType: IRequestSubject<void>;
};

/**
 *  @param infrastructure
 *  @param userController
 *  @description Registers a user to Culturale API
 */
export function signup(
  infrastructure: IInfrastructure,
  userController: IUserController,
  ...args: Signup['args']
): Signup['responseType'] {
  const [
    username,
    name,
    password,
    email,
    phoneNumber,
    userType,
    profilePicture,
  ] = args;
  const subject = new RequestSubject<void>('Signup');
  subject.startRequest();

  infrastructure.api
    .signUp(
      username,
      name,
      password,
      email,
      phoneNumber,
      userType,
      profilePicture
    )
    .then((userInfo: UserDocument) => {
      const { username, name, email, profilePicture, phoneNumber, userType } =
        userInfo;
      const user = new User(
        username,
        name,
        password,
        email,
        profilePicture,
        phoneNumber,
        userType
      );

      userController.setUserInfo(user);

      subject.completeRequest();
    })
    .catch((e) => {
      subject.failRequest(e);
    });

  return subject;
}
