import { User } from '~/domain/entities';
import type { IUser } from '~/domain/entities';

export function userFactory(json: any): IUser {
  return new User(
    json.username,
    json.name,
    json.password,
    json.email,
    json.profilePicture,
    json.phoneNumber,
    json.usertype,
  );
}
