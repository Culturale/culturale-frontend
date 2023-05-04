import type { IAPI } from './api.interface';

export interface FailTaskInfo {
  reason: string;
}

export interface IMockAPI extends IAPI {
  token: string;
  mockError: (error: string) => void;
  failedTasks: Record<string, FailTaskInfo>;
  returnAPIError: boolean;
}

export class MockAPI implements IMockAPI {
  // @ts-ignore
  private readonly baseURL: string;
  public token: string;
  public readonly failedTasks: Record<string, FailTaskInfo> = {};
  // @ts-ignore
  private error: string;
  public returnAPIError = false;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  public mockError(error: string): void {
    this.error = error;
  }

  public mockReturnAPIError() {
    this.returnAPIError = true;
  }

  public setup(token: string) {
    this.token = token;
  }

  public async login(_username: string, _password: string): Promise<string> {
    return Promise.resolve('access-token');
  }
}
