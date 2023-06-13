import express from 'express';
import createUserSchema from './user.Validation';
import validateRequest from '../../middleware/validateRequest';
import createUser from './user.controller';
import { createStudentController } from '../student/student.controller';
import { studentSchema } from '../student/student.validation';


const router = express.Router();

// router.post('/create-user', validateRequest(createUserSchema), createUser);
router.post('/create-student',  createStudentController);

export const UserRouter = router;
