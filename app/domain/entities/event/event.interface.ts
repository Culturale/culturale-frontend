import type { IChat } from '~/domain/entities/chat/chat.interface';

import type { IUser } from '../user';
import { Review } from '../review';

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
  price?: string;
  photo?: string;
  participants: IUser[];
  preu: string;
  valoracions?: Review[];

  updateParticipant: (newParticipant: IUser) => void;
  updateValoracions: (newValoracio: Review) => void;
  readonly participantsUsernames: string[];
  readonly id: string;
}
