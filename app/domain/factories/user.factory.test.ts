import { User } from '~/domain/entities';
import { userFactory } from '~/domain/factories';

describe('userFactory', () => {
  it('should create a new User instance with correct atributes', () => {
    const json = {
      email: 'test-email',
      name: 'test-name',
      password: 'test-password',
      phoneNumber: 'test-phone',
      profilePicture: 'test-profilePicture',
      username: 'test-username',
      usertype: 'test-type',
    };

    const user = userFactory(json);

    expect(user).toBeInstanceOf(User);
    expect(user.username).toEqual(json.username);
    expect(user.name).toEqual(json.name);
    expect(user.email).toEqual(json.email);
    expect(user.profilePicture).toEqual(json.profilePicture);
    expect(user.phoneNumber).toEqual(json.phoneNumber);
    expect(user.usertype).toEqual(json.usertype);
  });
});