import { Request, Response, NextFunction } from 'express';
import usersService from './users.service';
import { apiError } from '../../../models/apiError';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body;
    const result = await usersService.createUser(user);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    const statusCode = 400; // Set the desired status code for the error
    const errorMessage = JSON.stringify(err.errors || err.message || err, null, 2); // Convert the error object to a formatted JSON string with indentation

    // Create an instance of apiError with the error details
    const error = new apiError(errorMessage, statusCode);

    // Pass the error instance to the global error handler middleware
    next(error);
  }
};

export default {
  createUser,
};
