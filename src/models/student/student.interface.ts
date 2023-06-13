export interface Student {
    id: string;
    name: {
      firstName: string;
      lastName: string;
      middleName: string;
    };
    dateOfBirth: string;
    gender: 'male' | 'female';
    bloodGroup: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    guardian: {
      fatherName: string;
      fatherOccupation: string;
      fatherContactNo: string;
      motherName: string;
      motherOccupation: string;
      motherContactNo: string;
      address: string;
    };
    localGuardian: {
      name: string;
      occupation: string;
      contactNo: string;
      address: string;
    };
    academicSemester: string;
    academicDepartment: string;
    academicFaculty: string;
  }
  