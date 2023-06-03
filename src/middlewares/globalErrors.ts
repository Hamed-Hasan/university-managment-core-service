
import logger from "../../shared/logger";
import { apiError } from "../models/apiError";

export const globalErrors = (err, req, res, next) => {
  if (err instanceof apiError) {
    // Handle custom errors
    return res.status(err.statusCode).json({
      error: {
        name: err.name,
        message: err.message,
        statusCode: err.statusCode,
      },
    });
  } else {
    // Handle other errors
    logger.error(err); // Log the error for debugging purposes using the 'error' method
    return res.status(500).json({ ErrorMessage: err });
  }
};

