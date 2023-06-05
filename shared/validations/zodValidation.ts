import { z, ZodError } from 'zod';

import ApiError from '../../src/models/apiError';
 // Replace <path-to> with the correct path to your ApiError file or module

// Validate an object against a Zod schema
export const validateAgainstSchema = (object: any, schema: z.ZodType<any>) => {
  try {
    schema.parse(object);
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }));
      throw new ApiError(400, 'Validation Error', errorMessages);
    }
    throw error;
  }
};
