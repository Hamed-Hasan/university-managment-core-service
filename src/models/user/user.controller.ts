import { Request, Response, NextFunction } from 'express';
import { User } from './user.model';
import catchAsync from '../../shared/catchAsync';
import responseHandler from '../../shared/responseHandler';
import { createUserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Perform your user creation logic here
  
    // For example, assuming you are using a User model
    const user = await createUserService(req.body);
  
    // Return a success response
    responseHandler<typeof User>(res, user, 201, 'User created successfully');
  });
  
  export default createUser;
