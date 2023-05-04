import type { Login } from './login';
import type { Signup } from './signup';

type UseCases = {
  Login: Login;
  Signup: Signup;
};

export type UseCasesMap = {
  [key in keyof UseCases]: (
    ...args: UseCases[key]['args']
  ) => UseCases[key]['responseType'];
};
