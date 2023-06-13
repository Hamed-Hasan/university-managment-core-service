import express from 'express';

import {
  createAcademicSemesterController,
  getAcademicSemesterByIdController,
  updateAcademicSemesterController,
  deleteAcademicSemesterController,
  getAllAcademicSemestersController,
  updateAcademicSemestersControllerMultiple,
} from './academicSemester.controller';
import { academicSemesterSchema } from './academicSemester.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.get('/academic-semesters', getAllAcademicSemestersController);
router.put('/academic-semesters', updateAcademicSemestersControllerMultiple);
router.post('/create-semester', validateRequest(academicSemesterSchema), createAcademicSemesterController);
router.get('/:id', getAcademicSemesterByIdController);

router.patch('/:id', validateRequest(academicSemesterSchema), updateAcademicSemesterController);
router.delete('/:id', deleteAcademicSemesterController);

export const academicSemesterRoutes = router;
