import { ErrorRequestHandler } from 'express';
import CustomError from '../errors/CustomError';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ errors: err.serializeErrors() });
  } else {
    console.error('Unhandled Error:', err);
    res.status(500).json({ errors: [{ message: 'Internal Server Error' }] });
  }
};

export default errorHandler;
