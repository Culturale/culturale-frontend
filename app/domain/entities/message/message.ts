import { makeObservable, observable } from 'mobx';

import type { IMessage } from './message.interface';

export type MessageProps = {
  id?: string;
  content: string;
  userId: string;
  date: Date;
};

export class Message implements IMessage {
  public id: string;
  public content: string;
  public userId: string;
  public date: Date;

  constructor(props: MessageProps) {
    const { id, content, userId, date } = props;
    this.id = id;
    this.content = content;
    this.userId = userId;
    this.date = date;

    makeObservable(this, {
      content: observable,
      date: observable,
      userId: observable,
    });
  }
}
