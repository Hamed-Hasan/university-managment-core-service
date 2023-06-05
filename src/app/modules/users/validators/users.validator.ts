import { z, ZodError } from 'zod';
import ApiError from '../../../../models/apiError';
import { IUser } from '../users.interface';
import { IGenericErrorMessage } from '../../../../interfaces/error';

// Define Zod schema for user data validation
const userSchema = z.object({
  role: z.string(),
  password: z.string().min(8, 'Password should be at least 8 characters long'),
});

// Validate user data
export const validateCreateUser = (user: IUser) => {
  try {
    // Validate using Zod schema
    userSchema.parse(user);
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages: IGenericErrorMessage[] = error.errors.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }));
      throw new ApiError(400, 'Validation Error', errorMessages);
    }
    throw error;
  }
};
