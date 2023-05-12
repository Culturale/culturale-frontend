import { User } from '~/domain/entities';
import type { IUser } from '~/domain/entities';
import type { UserDocument } from '~/infrastructure';
import { eventFactory } from './event.factory';

export function userFactory(userDocument: UserDocument): IUser {
  return new User({
    ...userDocument,
    followeds: userDocument.followeds?.map(userFactory),
    followers: userDocument.followers?.map(userFactory),
    eventSub: userDocument.eventSub?.map(eventFactory),
  });
}
