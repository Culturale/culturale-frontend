import { MockAPI } from './api';
import type { IInfrastructure } from './infrastructure.interface';
import type {
  IMockLocationService} from './services';
import { MockLocationService
} from './services';

export interface IMockInfrastructure extends IInfrastructure {
  readonly services: {
    location: IMockLocationService;
  };

  readonly api: MockAPI;
}

export class MockInfrastructure implements IMockInfrastructure {
  public readonly services: {
    location: IMockLocationService;
  };

  public readonly api: MockAPI;

  constructor() {
    this.services = {
      location: new MockLocationService()
    };
    this.api = new MockAPI('test-url');
  }
}
