import mongoose, { Schema, Document } from 'mongoose';

export interface IAcademicSemester extends Document {
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

const AcademicSemesterSchema: Schema = new Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model<IAcademicSemester>('AcademicSemester', AcademicSemesterSchema);
