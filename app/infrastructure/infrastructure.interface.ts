import type { IAPI } from './api';
import type {
  ILocationService
} from './services';
import type { IS3Service } from './services/uploadPhoto/s3.interface';

export interface IInfrastructure {
  services: {
    location: ILocationService;
    aws3: IS3Service;
  };
  api: IAPI;
}
