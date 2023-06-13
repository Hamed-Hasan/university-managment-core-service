import { Response } from 'express';
import { Document } from 'mongoose';

type ApiResponse<T> = {
  statusCode: number;
  message: string;
  success: boolean;
  data?: T | null | Document<any, any>;
};

const responseHandler = <T>(
  res: Response,
  data: T | null | Document<any, any>,
  statusCode: number,
  message: string,
  success: boolean = true
): void => {
  const responseBody: ApiResponse<T> = {
    statusCode,
    message,
    success,
    data,
  };

  res.status(statusCode).json(responseBody);
};

export default responseHandler;
