import type { Login } from './login';
import type { NewMessage } from './newmessage';

type UseCases = {
  Login: Login;
  NewMessage: NewMessage;
};

export type UseCasesMap = {
  [key in keyof UseCases]: (...args: UseCases[key]['args']) => UseCases[key]['responseType'];
};
