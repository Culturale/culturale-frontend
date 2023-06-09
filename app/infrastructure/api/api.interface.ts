import type { definitions, paths } from './schema';

export type EventDocument = definitions['event'];
export type UserDocument = definitions['user'];
export type MessageDocument = definitions['message'];
export type ChatDocument = definitions['chat'];
export type ReviewDocument = definitions['review'];

export type GetEventResponse =
  paths['/events/code/:id']['get']['responses']['200']['schema'];

export type GetEventsResponse =
  paths['/events']['get']['responses']['200']['schema'];

export type GetReviewsResponse =
  paths['/events/getReportedReviews']['get']['responses']['200']['schema'];

export type MessageResponse =
  paths['/events/:id/messages']['get']['responses']['200']['schema'];

export type GetUsersResponse =
  paths['/users/:username']['get']['responses']['200']['schema'];

export type GetUserResponse =
  paths['/users/id/:id']['get']['responses']['200']['schema'];

export type GetEventsByDenominacioResponse =
  paths['/events/denominacio/:denominacio']['get']['responses']['200']['schema'];

export type LoginResponse =
  paths['/login']['post']['responses']['200']['schema'];

export type SignupResponse =
  paths['/users/create']['post']['responses']['200']['schema'];

export type EditUserResponse =
  paths['/users/edit']['post']['responses']['200']['schema'];

export type RemoveFollowerResponse =
  paths['/users/deleteFollower']['delete']['responses']['200']['schema'];

export type AddFollowerResponse =
  paths['/users/newFollower']['post']['responses']['200']['schema'];

export type ReportResponse =
  paths['/events/reportReview']['put']['responses']['200']['schema'];

export type RemoveFavouriteResponse =
  paths['/users/deleteFavourite']['delete']['responses']['201']['schema'];

export type GetContactsFromNumbersResponse =
  paths['/users/:id/syncContacts']['post']['responses']['200']['schema'];

export interface IAPI {
  newEvent: (
    codi: number,
    denominacio: string,
    descripcio: string,
    preu: string,
    dataIni: Date,
    dataFi: Date,
    adress: string,
    lat: number,
    long: number,
    url: string,
    categoria: string,
    horaIni: string,
    horaFin: string
  ) => void;
  setup: (token: string) => void;

  login: (username: string, password: string) => Promise<LoginResponse>;

  signUp: (
    username: string,
    name: string,
    password: string,
    email: string,
    phoneNumber: string,
    userType: string,
    profilePicture?: string
  ) => Promise<UserDocument>;

  getUserPreferits: (username: string) => Promise<EventDocument[]>;

  getAllEvents: (page: number) => Promise<EventDocument[]>;

  getEvent: (id: string) => Promise<EventDocument>;

  getAllUsers: () => Promise<UserDocument[]>;

  getUsers: (username: string) => Promise<UserDocument[]>;

  getUser: (id: string) => Promise<UserDocument>;

  getMapEvents: (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => Promise<EventDocument[]>;

  getEventsByCategory: (category: string) => Promise<EventDocument[]>;

  getEventsByDenominacio: (denominacio: string) => Promise<EventDocument[]>;

  newMessage: (
    id: string,
    content: string,
    userId: string
  ) => Promise<MessageDocument>;
  getReviewReport: ()  => Promise<ReviewDocument[]>;

  newMessage: (id: string, content: string, userId: string) => Promise<MessageDocument>;

  editUser: (
    id: string,
    username: string,
    name: string,
    email: string,
    phoneNumber: string,
    usertype: string,
    profilePicture?: string
  ) => Promise<UserDocument>;

  addParticipant: (id: string, username: string) => Promise<void>;

  fetchEventsByFilters: (
    denominacio?: string,
    categoria?: string,
    dataIni?: Date,
    dataFi?: Date,
    horari?: string,
    price?: string
  ) => Promise<EventDocument[]>;

  getChatMessages: (id: string) => Promise<MessageDocument[]>;

  removeFriend(username: string, follower: string): Promise<UserDocument[]>;

  addFriend(username: string, follower: string): Promise<UserDocument[]>;

  removeFavourite(id: string, username: string): Promise<EventDocument[]>;

  addFavourite(id: string, username: string): unknown;

  addReview: (
    eventId: string,
    authorId: string,
    puntuation: number,
    comment?: string
  ) => Promise<ReviewDocument>;

  fetchPaymentSheetParams: (eventId: string) => Promise<any>;
  reportReview: (reviewId: string) => Promise<void>;
  getContactsFromNumbers: (contacts: any, id: string) => void;
  reportUser: (userId: string) => Promise<void>;
}
