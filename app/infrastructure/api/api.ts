import type { AxiosInstance } from 'axios';
import axios from 'axios';

import type {
  EventDocument,
  IAPI,
  MessageDocument,
  UserDocument,
} from './api.interface';

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
    const res = await this.axiosClient.post<string>('/login', {
      password,
      username,
    });

    return res.data;
  }

  public async getAllEvents(): Promise<EventDocument[]> {
    const res = await this.axiosClient.get<EventDocument[]>('/events');

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Error getting events');
    }
  }

  public async signUp(
    username: string,
    name: string,
    password: string,
    email: string,
    profilePicture: string,
    userType: string,
  ): Promise<UserDocument> {
    const res = await this.axiosClient.post<UserDocument>('/users/create', {
      username,
      name,
      password,
      email,
      profilePicture,
      userType,
    });

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Error signing up');
    }
  }

  public async getChatMessages(id: string): Promise<MessageDocument[]> {
    const res = await this.axiosClient.get<MessageDocument[]>(
      `/events/${id}/messages`,
    );

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error('Error getting event chat messages');
    }
  }
}
