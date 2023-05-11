import type { IChat } from '~/domain/entities/chat/chat.interface';

import type { IUser } from '../user';

export interface IEvent {
  id: string;
  codi: number;
  denominacio: string;
  descripcio: string;
  dataIni: Date;
  dataFi: Date;
  horari?: string;
  adress?: string;
  lat: number;
  long: number;
  price: string;
  url: string;
  photo: string;
  chat: IChat;
  participants: IUser[];

  updateParticipant: (newParticipant: IUser) => void;
}
