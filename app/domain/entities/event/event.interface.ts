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
  url: string;
  chat: IChat;
  participants: IUser[];
  preu: string;

  updateParticipant: (newParticipant: IUser) => void;
}
