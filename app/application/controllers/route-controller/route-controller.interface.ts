import type { Controller } from '~/application/controllers/controller.interface';
import type { IRoute } from '~/domain';

/**
 * Module that controls the route assigned to the driver
 *
 */
export interface IRouteController extends Controller {
  route: IRoute;

  setup: () => Promise<void>;

  setRoute: (route: IRoute) => void;
}
