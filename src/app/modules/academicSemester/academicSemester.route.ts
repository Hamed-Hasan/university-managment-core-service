import express from 'express';
import { createAcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post('/', createAcademicSemesterController);

export default router;
