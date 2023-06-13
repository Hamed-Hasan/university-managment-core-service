import AcademicSemester from './academicSemester.model';
import { IAcademicSemester } from './academicSemester.interface';

export const createAcademicSemester = async (academicSemesterData: IAcademicSemester): Promise<IAcademicSemester> => {
  const academicSemester = await AcademicSemester.create(academicSemesterData);
  return academicSemester;
};

export const getAcademicSemesterById = async (academicSemesterId: string): Promise<IAcademicSemester | null> => {
  const academicSemester = await AcademicSemester.findById(academicSemesterId);
  return academicSemester;
};

// export const getAllAcademicSemesters = async (): Promise<IAcademicSemester[]> => {
//   const academicSemesters = await AcademicSemester.find();
//   return academicSemesters;
// };

export const updateAcademicSemester = async (
  academicSemesterId: string,
  academicSemesterData: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  const academicSemester = await AcademicSemester.findByIdAndUpdate(academicSemesterId, academicSemesterData, {
    new: true,
  });
  return academicSemester;
};

export const updateAcademicSemestersMultiple = async (
    academicSemestersData: Partial<IAcademicSemester>[]
  ): Promise<IAcademicSemester[] | null> => {
    try {
      const promises = academicSemestersData.map(async (academicSemesterData) => {
        const { id, ...updateData } = academicSemesterData;
        const updatedAcademicSemester = await AcademicSemester.findByIdAndUpdate(id, updateData, { new: true });
        return updatedAcademicSemester;
      });
      const updatedAcademicSemesters = await Promise.all(promises);
      return updatedAcademicSemesters.filter((academicSemester) => academicSemester !== null) as IAcademicSemester[];
    } catch (error) {
      throw new Error('Failed to update academic semesters');
    }
  };
  
  


export const deleteAcademicSemester = async (academicSemesterId: string): Promise<IAcademicSemester | null> => {
  const academicSemester = await AcademicSemester.findByIdAndDelete(academicSemesterId);
  return academicSemester;
};
