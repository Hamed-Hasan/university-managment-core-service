import { IGenericErrorMessage } from "../interfaces/error";

class ApiError extends Error {
  statusCode: number;
  message: string;
  errorMessages?: IGenericErrorMessage[];

  constructor(statusCode: number, message: string, errorMessages?: IGenericErrorMessage[]) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errorMessages = errorMessages;
  }
}



export default ApiError;
