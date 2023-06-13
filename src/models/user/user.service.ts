
import { User } from './user.model';
import { generateId } from './user.utils';

export const createUserService = async (userData: any, session: any) => {
  const id = generateId();
  const user = await User.create([{ ...userData, id }], { session: session });
  return user[0];
};