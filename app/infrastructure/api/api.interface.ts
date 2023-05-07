export interface IAPI {
  setup: (token: string) => void;
  login: (username: string, password: string) => Promise<string>;
}
