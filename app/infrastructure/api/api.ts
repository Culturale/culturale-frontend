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

    if (!res?.user) {
      throw Error('User not found');
    }

    return res;
  }

  // public async getAllEvents(): Promise<EventDocument[]> {
  //   const res = await this.get<GetEventsResponse>('/events');
  //   return res.events;
  // }

  public async getAllEvents(): Promise<EventDocument[]> {
    console.log("HOLA");
    const res = {
      "events": [
        {
          "_id": "6469f0a7816196c994a9f52a",
          "codi": 12345678888,
          "denominacio": "PRUEBAAAAAA",
          "descripcio": "Muy Guay",
          "dataIni": "2023-05-20T00:00:00.000Z",
          "dataFi": "2023-05-20T00:00:00.000Z",
          "horari": "matins",
          "adress": "Calle 19 sobre atico",
          "lat": 47.3851,
          "long": 8.1734,
          "url": "https://static.mfah.com/images/main-campus-18.15829485354753099698.jpg?width=1680",
          "photo": "https://media.istockphoto.com/id/501387734/es/foto/amigos-bailando.jpg?s=1024x1024&w=is&k=20&c=Sk6pj_YhCsZaWHe9UqGE9oS-z3vo20qZFGLuJvUH1qs=",
          "chat": "6469f0a7816196c994a9f528",
          "participants": [
            {
              "_id": "6469ee0b816196c994a9f524",
              "name": "elsa",
              "username": "elsa",
              "email": "elsa@gmail.com",
              "password": "$2b$10$5zKrA8QqOtSOJ9vgXLCAVunvGFBotHJ9cmnRQY0Afh5kbeZSxhdjC",
              "phoneNumber": "666444322",
              "profilePicture": "https://projecteaws.s3.eu-west-3.amazonaws.com/profile.png",
              "usertype": "usuario",
              "followers": [],
              "followeds": [],
              "eventSub": [
                "6469f0a7816196c994a9f52a",
                "646a07e5816196c994a9f575",
                "6469f314816196c994a9f535"
              ],
              "reviews": [
                "646b86df894cd975d5b9e887",
                "646f95013ae2e4a40c7f2ba4"
              ],
              "__v": 0
            }
          ],
          "valoracions": [
            {
              "_id": "646b86df894cd975d5b9e887",
              "authorId": "6469ee0b816196c994a9f524",
              "eventId": "6469f0a7816196c994a9f52a",
              "puntuation": 3,
              "comment": null,
              "__v": 0
            }
          ]
        },
        {
          "_id": "6469f314816196c994a9f535",
          "codi": 12345678888,
          "denominacio": "PRUEBAAAAAA",
          "descripcio": "Muy Guay",
          "dataIni": "2023-06-20T00:00:00.000Z",
          "dataFi": "2023-06-20T00:00:00.000Z",
          "horari": "matins",
          "adress": "Calle 19 sobre atico",
          "lat": 44.3851,
          "long": 5.1734,
          "url": "https://static.mfah.com/images/main-campus-18.15829485354753099698.jpg?width=1680",
          "photo": "https://media.istockphoto.com/id/501387734/es/foto/amigos-bailando.jpg?s=1024x1024&w=is&k=20&c=Sk6pj_YhCsZaWHe9UqGE9oS-z3vo20qZFGLuJvUH1qs=",
          "chat": "6469f314816196c994a9f533",
          "participants": [
            {
              "_id": "6469ee0b816196c994a9f524",
              "name": "elsa",
              "username": "elsa",
              "email": "elsa@gmail.com",
              "password": "$2b$10$5zKrA8QqOtSOJ9vgXLCAVunvGFBotHJ9cmnRQY0Afh5kbeZSxhdjC",
              "phoneNumber": "666444322",
              "profilePicture": "https://projecteaws.s3.eu-west-3.amazonaws.com/profile.png",
              "usertype": "usuario",
              "followers": [],
              "followeds": [],
              "eventSub": [
                "6469f0a7816196c994a9f52a",
                "646a07e5816196c994a9f575",
                "6469f314816196c994a9f535"
              ],
              "reviews": [
                "646b86df894cd975d5b9e887",
                "646f95013ae2e4a40c7f2ba4"
              ],
              "__v": 0
            }
          ],
          "valoracions": []
        },
        {
          "_id": "646a07e5816196c994a9f575",
          "codi": 12345678888,
          "denominacio": "MIRA",
          "descripcio": "Muy Guay",
          "dataIni": "2023-06-02T00:00:00.000Z",
          "dataFi": "2023-06-20T00:00:00.000Z",
          "horari": "matins",
          "adress": "Calle 19 sobre atico",
          "lat": 31.3851,
          "long": 1.1734,
          "url": "https://static.mfah.com/images/main-campus-18.15829485354753099698.jpg?width=1680",
          "photo": "https://media.istockphoto.com/id/501387734/es/foto/amigos-bailando.jpg?s=1024x1024&w=is&k=20&c=Sk6pj_YhCsZaWHe9UqGE9oS-z3vo20qZFGLuJvUH1qs=",
          "chat": "646a07e5816196c994a9f573",
          "participants": [
            {
              "_id": "6469ee0b816196c994a9f524",
              "name": "elsa",
              "username": "elsa",
              "email": "elsa@gmail.com",
              "password": "$2b$10$5zKrA8QqOtSOJ9vgXLCAVunvGFBotHJ9cmnRQY0Afh5kbeZSxhdjC",
              "phoneNumber": "666444322",
              "profilePicture": "https://projecteaws.s3.eu-west-3.amazonaws.com/profile.png",
              "usertype": "usuario",
              "followers": [],
              "followeds": [],
              "eventSub": [
                "6469f0a7816196c994a9f52a",
                "646a07e5816196c994a9f575",
                "6469f314816196c994a9f535"
              ],
              "reviews": [
                "646b86df894cd975d5b9e887",
                "646f95013ae2e4a40c7f2ba4"
              ],
              "__v": 0
            }
          ],
          "valoracions": [
            {
              "_id": "646f95013ae2e4a40c7f2ba4",
              "authorId": "6469ee0b816196c994a9f524",
              "eventId": "646a07e5816196c994a9f575",
              "puntuation": 3,
              "comment": "Hola",
              "__v": 0
            }
          ]
        },
        {
          "_id": "646ff42ad5a4a5ed7e275451",
          "codi": 12345678888,
          "denominacio": "MIRA",
          "descripcio": "Muy Guay",
          "dataIni": "2023-06-02T00:00:00.000Z",
          "dataFi": "2023-06-20T00:00:00.000Z",
          "horari": "matins",
          "adress": "Calle 19 sobre atico",
          "lat": 41.3851,
          "long": 2.1734,
          "url": "https://static.mfah.com/images/main-campus-18.15829485354753099698.jpg?width=1680",
          "photo": "https://media.istockphoto.com/id/501387734/es/foto/amigos-bailando.jpg?s=1024x1024&w=is&k=20&c=Sk6pj_YhCsZaWHe9UqGE9oS-z3vo20qZFGLuJvUH1qs=",
          "chat": "646ff42ad5a4a5ed7e27544f",
          "participants": [],
          "valoracions": []
        }
      ]};
      // await this.get<GetEventsResponse>('/events');
      console.log(res.events);
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
