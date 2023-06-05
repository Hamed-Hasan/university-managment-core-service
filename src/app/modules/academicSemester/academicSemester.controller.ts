import { Request, Response, NextFunction } from 'express';
import { createAcademicSemester } from './academicSemester.service';

export const createAcademicSemesterController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const academicSemesterData = req.body;
    const createdAcademicSemester = await createAcademicSemester(academicSemesterData);
    res.status(200).json({
      success: true,
      message: 'Academic semester created successfully!',
      data: createdAcademicSemester,
    });
  } catch (error) {
    next(error);
  }
};
