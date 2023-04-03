import type { IRoute} from '~/domain/repositories';
import { Route } from '~/domain/repositories';
import type { definitions } from '~/infrastructure/api/schema';

import { stopFactory } from './stop.factory';

export function routeFactory(data: definitions['routePlan']): IRoute {
  const route = new Route();
  const stops = data.stops.map((stop) => stopFactory(stop));

  route.setRoute(stops);

  return route;
}
