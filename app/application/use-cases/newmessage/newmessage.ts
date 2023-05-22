import type { IInfrastructure, MessageDocument } from '~/infrastructure';
import type { IRequestSubject } from '~/observables';
import { RequestSubject } from '~/observables';

export type NewMessage = {
  args: [content: string, userId: string, date: Date];
  responseType: IRequestSubject<void>;
};

/**
 *  @param infrastructure
 *  @param userController
 *  @description Adds a message to a chat
 */
export function newmessage(
  infrastructure: IInfrastructure,
  ...args: NewMessage['args']
): NewMessage['responseType'] {
  const [content, userId, date] = args;
  const subject = new RequestSubject<void>('newMessage');
  console.log("Usecase");
  subject.startRequest();

  infrastructure.api
    .newMessage(content, userId, date)
    .then((res: MessageDocument) => {
      console.log("CompleteUsecase");
      subject.completeRequest();
    })
    .catch((e) => {
      subject.failRequest(e);
    });

  return subject;
}
