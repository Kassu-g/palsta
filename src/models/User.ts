import { Schema, model } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  username: string;
  isAdmin: boolean;
}

const userSchema = new Schema<IUser>({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  isAdmin:  { type: Boolean, default: false }
});

export default model<IUser>('User', userSchema);
