import { makeObservable, observable } from 'mobx';

import type { IMessage } from '~/domain/entities/message/message.interface';

import type { IChat } from './chat.interface';

export type ChatProps = {
  _id: string;
  messages: IMessage[];
};

export class Chat implements IChat {
  public _id: string;
  public messages?: IMessage[];

  constructor(props: ChatProps) {
    const { _id, messages } = props;
    this._id = _id;
    this.messages = messages;

    makeObservable(this, {
      messages: observable,
    });
  }
}
