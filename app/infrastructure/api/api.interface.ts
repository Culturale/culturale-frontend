import type { IToken } from '~/domain/entities';

export interface IAPI {
  setup: (token: IToken) => void;
}
