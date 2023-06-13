import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

const validateRequest = (schema: z.Schema<any>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult = schema.safeParse(req.body);

  if (validationResult.success) {
    req.body = validationResult.data;
    next();
  } else {
    const validationErrors = validationResult.error.flatten() as unknown as ZodError<any>;

    const errorMessages = validationErrors.errors?.map((error) => error.message);

    res.status(400).json({
      statusCode: 400,
      message: 'Validation Error',
      success: false,
      errors: errorMessages,
    });
  }
};

export default validateRequest;
