import { UserController } from './user-controller';
import type { IUserController } from './user-controller.interface';

describe('DriverController', function () {
  let instance: IUserController;

  beforeEach(function () {
    instance = new UserController();
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });

  describe('isLoggedIn', function () {
    it('should be null by default', function () {
      expect(instance.isLoggedIn).toBe(null);
    });

    it('setLoggedIn', function () {
      instance.setIsLoggedIn(true);

      expect(instance.isLoggedIn).toBeTruthy();

      instance.setIsLoggedIn(false);

      expect(instance.isLoggedIn).toBeFalsy();
    });
  });

  describe('removeToken', function () {
    it('should be null token and fleetEngineAccessToken', function () {
      instance.removeToken();
      expect(instance.token).toBeNull();
    });
  });

  describe('isLoginNeeded', function () {
    it('login not needed', function () {
      const instance = new UserController('access-token');

      expect(instance.isLoginNeeded).toBeFalsy();
    });

    it('token invalid', function () {
      const instance = new UserController('access-token');

      expect(instance.isLoginNeeded).toBeTruthy();
    });
  });
});
