import type { IChat } from '~/domain/entities/chat/chat.interface';

import type { IUser } from '../user';

export interface IEvent {
  _id: string;
  codi: number;
  denominacio: string;
  descripcio: string;
  dataIni: Date;
  dataFi: Date;
  horari?: string;
  adress?: string;
  url: string;
  chat: IChat;
  lat: number;
  long: number;
  photo?: string;
  participants: IUser[];

  updateParticipant: (newParticipant: IUser) => void;
  readonly participantsUsernames: string[];
  readonly id: string;
}
