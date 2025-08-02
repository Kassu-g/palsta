import { Schema, model } from 'mongoose';

export interface ITopic {
  title: string;
  content: string;
  username: string;
  createdAt: Date;
}

const topicSchema = new Schema<ITopic>({
  title:     { type: String, required: true },
  content:   { type: String, required: true },
  username:  { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default model<ITopic>('Topic', topicSchema);
