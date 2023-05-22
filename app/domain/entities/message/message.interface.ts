export interface IMessage {
  _id: string;
  content: string;
  userId: string;
  date: Date;
  
  readonly id: string;
}
