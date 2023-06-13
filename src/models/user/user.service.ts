
import { User } from './user.model';
import { generateId } from './user.utils';

export const createUserService = async (userData: any) => {
  const id = generateId();
  // Use the generated ID for user creation or other purposes
  // For example, assuming you are using a User model
  const user = await User.create({ ...userData, id });
  return user;
};
