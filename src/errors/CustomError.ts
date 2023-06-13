import { ErrorRequestHandler } from 'express';
import ApiError from './ApiError';

abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];

  static errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
      res.status(err.statusCode).json({ errors: err.serializeErrors() });
    } else {
      console.error('Unhandled Error:', err);
      res.status(500).json({ errors: [{ message: 'Internal Server Error' }] });
    }
  };
}

export default CustomError;
