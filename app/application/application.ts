import { computed, makeObservable, observable } from 'mobx';

import type { IInfrastructure } from '~/infrastructure';
import { Infrastructure } from '~/infrastructure';
import type { IRequestSubject } from '~/observables';

import type { IApplication, UseCaseRequestID } from './application.interface';
import type { Controllers } from './controllers';
import { EventController, UserController } from './controllers';
import { login } from './use-cases';
import { signup } from './use-cases/signup';
import type { UseCasesMap } from './use-cases/use-cases';

export class Application implements IApplication {
  public readonly controllers: Controllers;

  public readonly useCases: UseCasesMap;

  private infrastructure: IInfrastructure;
  private errors: Map<string, Error> = new Map<string, Error>();
  public readonly useCasesRequests: Map<
    UseCaseRequestID,
    IRequestSubject<unknown>
  > = new Map<UseCaseRequestID, IRequestSubject<unknown>>();

  constructor() {
    this.infrastructure = new Infrastructure();

    this.controllers = {
      EventController: new EventController(this.infrastructure),
      UserController: new UserController(),
    };

    this.useCases = {
      Login: (username: string, password: string) => {
        const subject = login(
          this.infrastructure,
          this.controllers.UserController,
          username,
          password
        );
        this.useCasesRequests.set('Login', subject);
        return subject;
      },
      Signup: (
        username: string,
        name: string,
        password: string,
        email: string,
        profilePicture: string,
        userType: string
      ) => {
        const subject = signup(
          this.infrastructure,
          this.controllers.UserController,
          username,
          name,
          password,
          email,
          profilePicture,
          userType
        );
        this.useCasesRequests.set('Signup', subject);
        return subject;
      },
    };

    makeObservable(this, {
      controllerErrors: computed,
      useCasesRequests: observable,
    });
    console.log(this.useCases);
  }

  public async setup(): Promise<void> {
    console.log('setup');
    await this.controllers.UserController.setup();
    if (this.controllers.UserController.token) {
      this.infrastructure.api.setup(this.controllers.UserController.token);
    }
  }

  public get controllerErrors(): Map<string, Error> {
    return this.errors;
  }
}
