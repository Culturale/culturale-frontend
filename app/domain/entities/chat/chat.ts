import { makeObservable, observable } from 'mobx';

import type { IMessage } from '~/domain/entities/message/message.interface';

import type { IChat } from './chat.interface';

export type ChatProps = {
  id: string;
  messages: IMessage[];
};

export class Chat implements IChat {
  public id: string;
  public messages?: IMessage[];

  constructor(props: ChatProps) {
    const { id, messages } = props;
    this.id = id;
    this.messages = messages;

    makeObservable(this, {
      messages: observable,
    });
  }
}
