import { StudentModel } from './student.model';
import { Student } from './student.interface';

export const createStudent = async (student: Student, session: any): Promise<Student> => {
    const createdStudent = await StudentModel.create([student], { session: session });
    return createdStudent[0].toObject();
  };
  
export const getStudentById = async (id: string): Promise<Student | null> => {
  const student = await StudentModel.findById(id);
  return student ? student.toObject() : null;
};

export const updateStudent = async (
  id: string,
  updates: Partial<Student>
): Promise<Student | null> => {
  const updatedStudent = await StudentModel.findByIdAndUpdate(id, updates, {
    new: true,
  });
  return updatedStudent ? updatedStudent.toObject() : null;
};

export const deleteStudent = async (id: string): Promise<void> => {
  await StudentModel.findByIdAndDelete(id);
};
