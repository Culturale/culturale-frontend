import type { MongoId } from '~/types/types';

import type { IMessage } from './message.interface';

export type MessageProps = {
  id?: MongoId;
  content: string;
  userId: string;
  date: Date;
};

export class Message implements IMessage {
  public _id: MongoId;
  public content: string;
  public userId: string;
  public date: Date;

  constructor(props: MessageProps) {
    const { id, content, userId, date } = props;
    this._id = id;
    this.content = content;
    this.userId = userId;
    this.date = date;
  }
}
