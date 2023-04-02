import env from '~/config/env';

import type { IAPI } from './api';
import { API } from './api';
import type { IInfrastructure } from './infrastructure.interface';
import type { ILocationService} from './services';
import { LocationService } from './services';

export class Infrastructure implements IInfrastructure {
  public readonly services: {
    location: ILocationService;
  };

  public readonly api: IAPI;

  constructor() {
    this.services = {
      location: new LocationService()
    };
    this.api = new API(env.API_HOST);
  }
}
