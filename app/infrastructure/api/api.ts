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
  ReviewDocument,
  SignupResponse,
  UserDocument,
} from './api.interface';

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

  private async getEvents<T>(path: string, params: object): Promise<T> {
    const url = new URL(this.baseURL + path);
    Object.keys(params).forEach((key) => {
      url.searchParams.append(key, params[key]);
    });
    return fetch(url.toString(), {
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

  private async get<T>(path: string): Promise<T> {
    console.log(this.baseURL + path);
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

    if (!res?.user) {
      throw Error('User not found');
    }

    return res;
  }

  public async getAllEvents(): Promise<EventDocument[]> {
    const res = await this.get<GetEventsResponse>('/events');
    return res.events;
  }

  public async getEventsByCategory(category: string): Promise<EventDocument[]> {
    const res = await this.get<GetEventsResponse>(`/events/categoria/${category}`);
    return res.events;
  }

  public async getEventsByDenominacio(denominacio: string): Promise<EventDocument[]> {
    const res = await this.get<GetEventsResponse>(`/events/denominacio/${denominacio}`);
    return res.events;
  }

  public async fetchEventsByFilters(denominacio?: string,
                                    descripcio?: string,
                                    dataIni?: Date,
                                    dataFi?: Date,
                                    horari?: string,
                                    price?: string,     ): Promise<EventDocument[]> {

    const res = await this.get<GetEventsResponse>(`/events/filters/?denominacio=${denominacio}&descripcio=${descripcio}&dataIni=${dataIni}&dataFi=${dataFi}&horari=${horari}&price=${price}`);
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
    const res = await this.delete<RemoveFollowerResponse>('/users/deleteFollower', {
      follower,
      username
    });

    return res.followers;
  }

  private async delete<T>(path: string, body: object): Promise<T> {
    const response = await fetch(this.baseURL + path, {
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        Authorization: this.token,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    return json as T;
  }  

  public async addParticipant(id: string, username: string): Promise<void> {
    await this.post<MessageDocument>('/events/newParticipant', {
      id,
      username
    });
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

  public async addReview(eventId: string, authorId: string, puntuation: number,  comment?: string): Promise<ReviewDocument> {
    const res = await this.post<ReviewDocument>('/events/addReview', {
      authorId,
      comment,
      eventId,
      puntuation
    });
    return res;
  }

}
