import type { IReview } from './review.interface';

export type reviewProps = {
  puntuation: number;
  comment?: string;
  authorId: string;
  eventId: string;
};
export class Review implements IReview {
  public puntuation: number;
  public comment?: string;
  public authorId: string;
  public eventId: string;

  constructor(props: reviewProps) {
    const { puntuation, comment, authorId, eventId } = props;
    this.puntuation = puntuation;
    this.comment = comment || null;
    this.authorId = authorId;
    this.eventId = eventId;
  }

}
