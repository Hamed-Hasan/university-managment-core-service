import { z } from 'zod';

export const studentSchema = z.object({
  password: z.string(),
  student: z.object({
    name: z.object({
      firstName: z.string(),
      lastName: z.string(),
      middleName: z.string(),
    }),
    dateOfBirth: z.string(),
    gender: z.enum(['male', 'female']),
    bloodGroup: z.string(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: z.object({
      fatherName: z.string(),
      fatherOccupation: z.string(),
      fatherContactNo: z.string(),
      motherName: z.string(),
      motherOccupation: z.string(),
      motherContactNo: z.string(),
      address: z.string(),
    }),
    localGuardian: z.object({
      name: z.string(),
      occupation: z.string(),
      contactNo: z.string(),
      address: z.string(),
    }),
    academicSemester: z.string(),
    academicDepartment: z.string(),
    academicFaculty: z.string(),
  }),
});

// You can add more specific validation rules as needed
