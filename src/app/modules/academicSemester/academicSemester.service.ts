import { IAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

export const createAcademicSemester = async (academicSemesterData: IAcademicSemester): Promise<IAcademicSemester> => {
  const createdAcademicSemester = await AcademicSemester.create(academicSemesterData);
  return createdAcademicSemester;
};
