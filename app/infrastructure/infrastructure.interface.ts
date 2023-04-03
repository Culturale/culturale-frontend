import type { IAPI } from './api';
import type {
  ILocationService
} from './services';

export interface IInfrastructure {
  services: {
    location: ILocationService;
  };
  api: IAPI;
}
