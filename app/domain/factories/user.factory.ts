import { User } from '~/domain/entities';
import type { IUser } from '~/domain/entities';
import { UserDocument } from '~/infrastructure';

export function userFactory(userDocument: UserDocument): IUser {
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
