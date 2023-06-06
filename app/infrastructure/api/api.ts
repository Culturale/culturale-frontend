import type { AxiosInstance } from 'axios';
import axios from 'axios';

import type {
  AddFollowerResponse,
  EditUserResponse,
  EventDocument,
  GetEventsResponse,
  GetUsersResponse,
  GetUserResponse,
  GetEventResponse,
  IAPI,
  LoginResponse,
  MessageDocument,
  RemoveFollowerResponse,
  ReviewDocument,
  SignupResponse,
  UserDocument,
  RemoveFavouriteResponse,
  ReportResponse,
  MessageResponse,
  GetContactsFromNumbersResponse,
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
   
   console.log(JSON.stringify(body))
    console.log(this.baseURL + path + JSON.stringify(body));
    return fetch(this.baseURL + path, {
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
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
        Authorization: `Bearer ${this.token}`,
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
    return fetch(this.baseURL + path, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Token ' + this.token,
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
  private async put<T>(path: string, body: object): Promise<T> {
    console.log(JSON.stringify(body))
     return fetch(this.baseURL + path, {
       body: JSON.stringify(body),
       headers: {
         Accept: 'application/json',
         Authorization: `Bearer ${this.token}`,
         'Content-Type': 'application/json',
       },
       method: 'PUT',
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

  public async getAllUsers(): Promise<UserDocument[]> {
    const res = await this.get<GetUsersResponse>('/users');
    return res.users;
  }

  public async getUser(id: string): Promise<UserDocument> {
    const res = await this.get<GetUserResponse>(`/users/id/${id}`);
    return res.user;
  }

  public async getUsers(username: string): Promise<UserDocument[]> {
    const res = await this.get<GetUsersResponse>(`/users/?username=${username}`);
    return res.users;
  }

  public async getEvent(id: string): Promise<EventDocument> {
    const res = await this.get<GetEventResponse>(`/events/code/${id}`);
    return res.event;
  }

  public async getAllEvents(page: number): Promise<EventDocument[]> {
    const res = await this.get<GetEventsResponse>(`/events/50?page=${page}`);
    return res.events;
  }
  
  public async getMapEvents(lat1: number, lon1: number, lat2: number, lon2: number): Promise<EventDocument[]> {
      const url = `/events/mapa?lat1=${lat1}&lon1=${lon1}&lat2=${lat2}&lon2=${lon2}`;
      const res = await this.get<GetEventsResponse>(url);
      return res.events;
  }

  public async getUserPreferits(username: string): Promise<EventDocument[]> {
    const res = await this.get<UserDocument>(`/users/username/${username}`);
    return res.user.preferits;
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
                                    categoria?: string,
                                    dataIni?: Date,
                                    dataFi?: Date,
                                    horari?: string,
                                    price?: string,     ): Promise<EventDocument[]> {

    const res = await this.get<GetEventsResponse>(`/events/filters/?denominacio=${denominacio}&categoria=${categoria}&dataIni=${dataIni}&dataFi=${dataFi}&horari=${horari}&price=${price}`);
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
    id: string,
    username: string,
    name: string,
    email: string,
    phoneNumber: string,
    usertype: string,
    profilePicture?: string,
  ): Promise<UserDocument> {
    const res = await this.post<EditUserResponse>('/users/edit', {
      email,
      id,
      name,
      phoneNumber,
      profilePicture,
      username,
      usertype,
    });
    return res.user;
  }

  public async newMessage( id: string, content: string, userId: string): Promise<MessageDocument>{
    const date = new Date();
    const res = await this.post<MessageDocument> ('/events/newMessage', {
      content,
      date,
      id,
      userId,
    });
    return res;
  }

  public async removeFriend(username: string, follower:string): Promise<UserDocument[]> {
    const res = await this.delete<RemoveFollowerResponse>('/users/deleteFollower', {
      follower,
      username
    });

    return res.followers;
  }

  public async addFriend(username: string, follower:string): Promise<UserDocument[]> {
    const res = await this.post<AddFollowerResponse>('/users/newFollower', {
      follower,
      username
    });
    console.log(res);

    return res.followers;
  }

  public async addFavourite(id: string, username: string): Promise<void> {
    await this.post<MessageDocument>('/users/addFavourite', {
      id,
      username
    });
  }

  public async removeFavourite(id: string, username: string): Promise<EventDocument[]> {
    const res = await this.delete<RemoveFavouriteResponse>('/users/deleteFavourite', {
      id,
      username
    });
    return res.favourites;
  }

  private async delete<T>(path: string, body: object): Promise<T> {
    const response = await fetch(this.baseURL + path, {
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
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
    const res = await this.get<MessageResponse>(`/events/${id}/messages`);
    return res.messages;
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

  public async reportReview(reviewId: string): Promise<void> {
   await this.put<ReportResponse>('/events/reportReview', {
    reviewId,
    });
  }
  public async reportUser(username: string): Promise<void>{
    await this.put<ReportResponse>('/users/reportUser', {
      username,
    });
  }

  public async getContactsFromNumbers(contacts: any, id: string): Promise<void>  {
    contacts = contacts.map((phoneNumber) => {
     return {
       phoneNumber: phoneNumber.replace(/[^0-9]/g, '') // Eliminar caracteres no numéricos
     };
   });
    await this.post<GetContactsFromNumbersResponse>(`/users/${id}/syncContacts`, {
     contacts
 });
}
  public async newEvent(codi:number, denominacio: string, descripcio: string, preu: string, dataIni: Date, dataFi: Date, adress: string, lat: number, long: number, url: string, categoria: string, horaIni: string, horaFin: string){
    const horari = `${horaIni}-${horaFin}`;
    const res = await this.post<EventDocument>('/events/create', {
      adress,
      categoria,
      codi: Number(codi),
      dataFi, 
      dataIni, 
      denominacio,
      descripcio, 
      horari,
      lat: Number(lat), 
      long: Number(long), 
      preu,
      url
    });
    console.log(res);
    return res;
  }


}
