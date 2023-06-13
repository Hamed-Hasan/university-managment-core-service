import { Document, Model } from 'mongoose';

interface IUser {
  id: string;
  role: string;
  password: string;
}

interface UserModel extends Model<IUser>, IUser {}

export { IUser, UserModel };
