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
import { newmessage } from './use-cases/newmessage';
import { fetchPaymentSheetParams } from './use-cases/fetch-payment-sheet-params';

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
      UserController: new UserController(this.infrastructure),
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
      FetchPaymentSheetParams: (eventId: string) => {
        return fetchPaymentSheetParams(this.infrastructure, eventId);
      },
      Signup: (
        username: string,
        name: string,
        password: string,
        email: string,
        phoneNumber: string,
        userType: string,
        profilePicture?: string,
      ) => {
        const subject = signup(
          this.infrastructure,
          this.controllers.UserController,
          username,
          name,
          password,
          email,
          phoneNumber,
          userType,
          profilePicture,
        );
        this.useCasesRequests.set('Signup', subject);
        return subject;
      },
      NewMessage: (id: string, content: string, userId: string) => {
        const date = new Date();
        const subject = newmessage(
          this.infrastructure,
          id,
          content,
          userId,
          date,
        );
        this.useCasesRequests.set('NewMessage', subject);
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
