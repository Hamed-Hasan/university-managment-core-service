import { Schema, model, Types } from 'mongoose';
import { Student } from './student.interface';

const studentSchema = new Schema<Student>(
  {
    
    id: {
      type: String,
      required: true,
    },
   
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
        required: true,
      },
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    guardian: {
      fatherName: {
        type: String,
        required: true,
      },
      fatherOccupation: {
        type: String,
        required: true,
      },
      fatherContactNo: {
        type: String,
        required: true,
      },
      motherName: {
        type: String,
        required: true,
      },
      motherOccupation: {
        type: String,
        required: true,
      },
      motherContactNo: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    localGuardian: {
      name: {
        type: String,
        required: true,
      },
      occupation: {
        type: String,
        required: true,
      },
      contactNo: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    // academicFaculty: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'AcademicFaculty',
    //     required: true,
    //   },
    //   academicDepartment: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'AcademicDepartment',
    //     required: true,
    //   },
    //   academicSemester: {
    //     type: Schema.Types.ObjectId, // academicSemester --> _id
    //     ref: 'AcademicSemester',
    //     required: true,
    //   },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const StudentModel = model<Student>('Student', studentSchema);
