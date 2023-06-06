export interface IReview {
  _id: string;
  authorId: string;
  eventId: string;
  puntuation: number;
  comment?: string;


  readonly id: string;
}
