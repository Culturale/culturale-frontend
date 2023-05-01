import { User } from '~/domain/entities';
import { userFactory } from '~/domain/factories';

describe('userFactory', () => {
  it('should create a new User instance with correct atributes', () => {
    const json = {
      username: 'test-username',
      name: 'test-name',
      password: 'test-password',
      email: 'test-email',
      profilePicture: 'test-profilePicture',
      phoneNumber: 'test-phone',
      usertype: 'test-type',
    };

    const user = userFactory(json);

    expect(user).toBeInstanceOf(User);
    expect(user.username).toEqual(json.username);
    expect(user.name).toEqual(json.name);
    expect(user.password).toEqual(json.password);
    expect(user.email).toEqual(json.email);
    expect(user.profilePicture).toEqual(json.profilePicture);
    expect(user.phoneNumber).toEqual(json.phoneNumber);
    expect(user.usertype).toEqual(json.usertype);
  });
});