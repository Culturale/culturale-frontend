import { computed, makeObservable, observable } from 'mobx';

import type { IInfrastructure } from '~/infrastructure';
import { Infrastructure } from '~/infrastructure';
import type { IRequestSubject } from '~/observables';

import type { IApplication, UseCaseRequestID } from './application.interface';
import { Controllers, EventController } from './controllers';
import { UserController } from './controllers';
import { login } from './use-cases';
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
      UserController: new UserController(),
      EventController: new EventController(this.infrastructure),
    };

    this.useCases = {
      Login: (username: string, password: string) => {
        const subject = login(
          this.infrastructure,
          this.controllers.UserController,
          username,
          password,
        );
        this.useCasesRequests.set('Login', subject);
        return subject;
      },
    };

    makeObservable(this, {
      controllerErrors: computed,
      useCasesRequests: observable,
    });
  }

  public async setup(): Promise<void> {
    await this.controllers.UserController.setup();
    if (this.controllers.UserController.token) {
      this.infrastructure.api.setup(this.controllers.UserController.token);
    }
  }

  public get controllerErrors(): Map<string, Error> {
    return this.errors;
  }
}
