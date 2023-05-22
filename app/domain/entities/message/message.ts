import { makeObservable, observable } from 'mobx';

import type { IMessage } from './message.interface';

export type MessageProps = {
  _id?: string;
  content: string;
  userId: string;
  date: Date;
};

export class Message implements IMessage {
  public _id: string;
  public content: string;
  public userId: string;
  public date: Date;

  constructor(props: MessageProps) {
    const { _id, content, userId, date } = props;
    this._id = _id;
    this.content = content;
    this.userId = userId;
    this.date = date;

    makeObservable(this, {
      content: observable,
      date: observable,
      userId: observable,
    });
  }

  public get id(): string {
    return this._id;
  }
}
