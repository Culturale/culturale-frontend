import { Schema, model } from 'mongoose';

import type { IReview } from './review.interface';

const ReviewSchema = new Schema({
  _id: { required: false, type: String },
  authorId: { required: true, type: String },
  comment: { required: false, type:  String}, 
  eventId: { required: true, type: String },
  puntuation: { required: true, type: Number}
});

const ReviewModel = model<IReview>('Review', ReviewSchema);

export { ReviewModel };
  