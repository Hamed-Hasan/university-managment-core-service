import { Model } from 'mongoose';

export type IAcademicFaculty = {
  title: string;
  id: string;
};

export type AcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;

export type IAcademicFacultyFilters = {
  searchTerm?: string;
};
