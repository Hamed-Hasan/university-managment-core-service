// User.ts
import { Document, Schema, model } from 'mongoose';

interface User extends Document {
  id: string;
  name: string;
  role: string;
}

const userSchema = new Schema<User>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
});

const UserModel = model<User>('User', userSchema);

export { User, UserModel };
