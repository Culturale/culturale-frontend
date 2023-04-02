import { computed, makeObservable, observable } from 'mobx';

import type { IInfrastructure} from '~/infrastructure';
import { Infrastructure } from '~/infrastructure';
import type { IRequestSubject, RequestSubscription } from '~/observables';
import { RequestSubject } from '~/observables';

import type { IApplication, UseCaseRequestID } from './application.interface';
import type {
  Controller,
  Controllers} from './controllers';
import {
  RouteController,
  DriverController
} from './controllers';
import {
  login
} from './use-cases';
import type { UseCasesMap } from './use-cases/use-cases';

export class Application implements IApplication {
  public readonly controllers: Controllers;

  public readonly useCases: UseCasesMap;

  private infrastructure: IInfrastructure;
  private errors: Map<string, Error> = new Map<string, Error>();
  public readonly useCasesRequests: Map<UseCaseRequestID, IRequestSubject<unknown>> = new Map<
    UseCaseRequestID,
    IRequestSubject<unknown>
  >();

  private errorSubscription = (
    controller: Controller,
    requestID: string
  ): RequestSubscription<any> => ({
    onCompleteRequest: () => {
      const subject = controller.requestsSubjectsMap[requestID];
      const newSubject = new RequestSubject<typeof subject.currentValue>(requestID);
      subject.unsubscribeFromRequest();

      controller.requestsSubjectsMap[requestID] = newSubject;
      newSubject.subscribeToRequest(this.errorSubscription(controller, requestID));
    },
    onRequestFailed: (error: Error) => {
      this.errors.set(requestID, error);
      const subject = controller.requestsSubjectsMap[requestID];
      const newSubject = new RequestSubject(requestID);
      subject.unsubscribeFromRequest();

      controller.requestsSubjectsMap[requestID] = newSubject;
      newSubject.subscribeToRequest(this.errorSubscription(controller, requestID));
    }
  });

  private setupErrorHandler() {
    for (const key in this.controllers) {
      const requestsSubjectsMap = this.controllers[key].requestsSubjectsMap;

      for (const requestID in requestsSubjectsMap) {
        requestsSubjectsMap[requestID].subscribeToRequest(
          this.errorSubscription(this.controllers[key], requestID)
        );
      }
    }
  }

  constructor() {
    this.infrastructure = new Infrastructure();

    this.controllers = {
      DriverController: new DriverController(),
      RouteController: new RouteController(this.infrastructure)
    };

    this.useCases = {
      Login: () => {
        const subject = login(
          this.infrastructure,
          this.controllers.DriverController,
          this.controllers.RouteController
        );
        this.useCasesRequests.set('Login', subject);
        return subject;
      }
    };

    this.setupErrorHandler();

    makeObservable(this, {
      controllerErrors: computed,
      useCasesRequests: observable
    });
  }

  public async setup(): Promise<void> {
    await this.controllers.DriverController.setup();
    await this.controllers.RouteController.setup();
    if (this.controllers.DriverController.token) {
      this.infrastructure.api.setup(this.controllers.DriverController.token);
    }
  }

  public get controllerErrors(): Map<string, Error> {
    return this.errors;
  }
}
