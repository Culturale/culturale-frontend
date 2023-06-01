import { User } from '~/domain/entities';
import type { IUser } from '~/domain/entities';
import type { UserDocument } from '~/infrastructure';

import { eventFactory } from './event.factory';

export function userFactory(userDocument: UserDocument | string): IUser {
  if( typeof userDocument === 'string') return null;
  return new User({
    ...userDocument,
    eventSub: userDocument.eventSub?.map(eventFactory),
    followeds: userDocument.followeds?.map(userFactory),
    followers: userDocument.followers?.map(userFactory),
    preferits: userDocument.preferits?.map(eventFactory),
  });
}
