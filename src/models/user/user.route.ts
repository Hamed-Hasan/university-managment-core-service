import express from 'express';
import createUserSchema from './user.Validation';
import validateRequest from '../../middleware/validateRequest';
import createUser from './user.controller';


const router = express.Router();

router.post('/create-user', validateRequest(createUserSchema), createUser);

export const UserRouter = router;
