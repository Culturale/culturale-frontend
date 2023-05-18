import type { AxiosInstance } from 'axios';
import axios from 'axios';

import type {
  EditUserResponse,
  EventDocument,
  GetEventsResponse,
  IAPI,
  LoginResponse,
  MessageDocument,
  RemoveFollowerResponse,
  SignupResponse,
  UserDocument,
} from './api.interface';
import { IUser } from '~/domain/entities';

export class API implements IAPI {
  private axiosClient: AxiosInstance;
  private readonly baseURL: string;
  private token: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.axiosClient = axios.create({
      baseURL: this.baseURL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  private async post<T>(path: string, body: object): Promise<T> {
    return fetch(this.baseURL + path, {
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        Authorization: this.token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data: T) => data)
      .catch((err: Error) => {
        throw err;
      });
  }

  private async get<T>(path: string): Promise<T> {
    return fetch(this.baseURL + path, {
      headers: {
        Accept: 'application/json',
        Authorization: this.token,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data: T) => data)
      .catch((err: Error) => {
        throw err;
      });
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
  }

  public async login(
    username: string,
    password: string,
  ): Promise<LoginResponse> {
    const res = await this.post<LoginResponse>('/users/login', {
      password,
      username,
    });
    return res;
  }

  public async getAllEvents(): Promise<EventDocument[]> {
    const res = await this.get<GetEventsResponse>('/events');
    console.log('events', res);
    return res.events;
  }

  public async signUp(
    username: string,
    name: string,
    password: string,
    email: string,
    phoneNumber: string,
    usertype: string,
    profilePicture?: string,
  ): Promise<UserDocument> {
    const res = await this.post<SignupResponse>('/users/create', {
      email,
      name,
      password,
      phoneNumber,
      profilePicture:
        profilePicture ||
        'https://projecteaws.s3.eu-west-3.amazonaws.com/profile.png',
      username,
      usertype,
    });

    return res.user;
  }

  public async editUser(
    username: string,
    name: string,
    email: string,
    phoneNumber: string,
    usertype: string,
    profilePicture?: string,
  ): Promise<UserDocument> {
    const res = await this.post<EditUserResponse>('/users/edit', {
      email,
      name,
      phoneNumber,
      profilePicture,
      username,
      usertype,
    });

    return res.user;
  }

  public async removeFriend(username: string, follower:string): Promise<UserDocument[]> {
    console.log("Borradi?")
    
    const res = await this.delete<RemoveFollowerResponse>('/users/deleteFollower', {
      username,
      follower
    });
    console.log("borradoApi")
    return res.followers;
  }
  private async delete<T>(path: string, body: object): Promise<T> {
    console.log("URL", this.baseURL + path);
    console.log("body",body);
    console.log("token", this.token + path);
    const response = await fetch(this.baseURL + path, {
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        Authorization: this.token,
        "Content-Type": "application/json"
      },
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const json = await response.json();
    console.log(json);
    return json as T;
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
