import { User } from '~/domain/entities';
import type { IUser } from '~/domain/entities';
import type { UserDocument } from '~/infrastructure';

export function userFactory(userDocument: UserDocument): IUser {
  return new User(
    userDocument.username,
    userDocument.name,
    userDocument.password,
    userDocument.email,
    userDocument.profilePicture,
    userDocument.phoneNumber,
    userDocument.userType
  );
}
