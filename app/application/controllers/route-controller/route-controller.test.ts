import type { IInfrastructure} from '~/infrastructure';
import { MockInfrastructure } from '~/infrastructure';

import { RouteController } from './route-controller';
import type { IRouteController } from './route-controller.interface';

describe('RouteController', function () {
  let instance: IRouteController;
  const infrastructure: IInfrastructure = new MockInfrastructure();

  beforeEach(function () {
    instance = new RouteController(infrastructure);
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });
});
