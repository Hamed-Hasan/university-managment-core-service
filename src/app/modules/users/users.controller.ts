import { NextFunction, Request, Response } from 'express';
import usersService from './users.service';
// import { validateCreateUser } from './validators/users.validator';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body;
    // validateCreateUser(user); // Validate user data before creating

    const result = await usersService.createUser(user);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  createUser,
};
