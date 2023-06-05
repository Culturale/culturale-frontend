import type { IInfrastructure, MessageDocument } from '~/infrastructure';
import type { IRequestSubject } from '~/observables';
import { RequestSubject } from '~/observables';

export type NewMessage = {
  args: [id: string, content: string, userId: string];
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
  const [id, content, userId] = args;
  const subject = new RequestSubject<void>('newMessage');
  subject.startRequest();

  infrastructure.api
    .newMessage(id, content, userId)
    .then((res: MessageDocument) => {
      console.log("CompleteUsecase");
      subject.completeRequest();
    })
    .catch((e) => {
      subject.failRequest(e);
    });

  return subject;
}
