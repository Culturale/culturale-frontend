import { FetchPaymentSheetParams } from './fetch-payment-sheet-params';
import type { Login } from './login';
import type { NewMessage } from './newmessage';
import type { Signup } from './signup';

type UseCases = {
  Login: Login;
  NewMessage: NewMessage;
  Signup: Signup;
  FetchPaymentSheetParams: FetchPaymentSheetParams;
};

export type UseCasesMap = {
  [key in keyof UseCases]: (
    ...args: UseCases[key]['args']
  ) => UseCases[key]['responseType'];
};
