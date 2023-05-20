import type { IMessage } from '~/domain/entities/message/message.interface';
export interface IChat {
  _id: string;
  messages?: IMessage[];
}
