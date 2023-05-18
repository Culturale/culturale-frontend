import env from '~/config/env';

import type { IAPI } from './api';
import { API } from './api';
import type { IInfrastructure } from './infrastructure.interface';
import type { ILocationService} from './services';
import { LocationService } from './services';
import { S3Service } from './services/uploadPhoto';
import type { IS3Service } from './services/uploadPhoto/s3.interface';

export class Infrastructure implements IInfrastructure {
  public readonly services: {
    location: ILocationService;
    aws3: IS3Service;
  };

  public readonly api: IAPI;

  constructor() {
    this.services = {
      aws3: new S3Service(),
      location: new LocationService()
    };
    this.api = new API(env.API_URL);
  }
}
