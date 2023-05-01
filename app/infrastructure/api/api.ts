import type { AxiosInstance } from 'axios';
import axios from 'axios';

import type { IAPI } from './api.interface';

export class API implements IAPI {
  private axiosClient: AxiosInstance;
  private readonly baseURL: string;
  private token: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  public setup(token: string) {
    this.token = token;

    this.axiosClient = axios.create({
      baseURL: this.baseURL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    });

    this.axiosClient.getUri();
  }

  public async login(username: string, password: string): Promise<string> {
    const res = await this.axiosClient.post<string, string>('/login', {
      password,
      username,
    });

    return res;
  }
}
