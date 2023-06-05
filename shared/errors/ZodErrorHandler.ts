import { ZodError } from 'zod';
import { Response } from 'express';

import ApiError from '../../src/models/apiError';
import { IGenericErrorResponse } from '../../src/interfaces/common';
import { IGenericErrorMessage } from '../../src/interfaces/error';


const handleZodValidationError = (error: ZodError): IGenericErrorResponse => {
  const errorMessages: IGenericErrorMessage[] = error.errors.map((err) => ({
    path: err.path.join('.'),
    message: err.message,
  }));

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages,
  };
};

const ZodErrorHandler = (error: Error, res: Response) => {
  if (error instanceof ZodError) {
    const response = handleZodValidationError(error);
    res.status(response.statusCode).json({
      success: false,
      message: response.message,
      errorMessages: response.errorMessages,
    });
  } else if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export default ZodErrorHandler;
