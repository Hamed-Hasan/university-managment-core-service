import { z } from 'zod';
import {
  academicSemesterTitles,
  academicSemesterCodes,
  academicSemesterMonths,
} from './academicSemester.constant';

// Convert custom types to tuples of strings
const academicSemesterTitleTuple = academicSemesterTitles as [string, ...string[]];
const academicSemesterCodeTuple = academicSemesterCodes as [string, ...string[]];
const academicSemesterMonthTuple = academicSemesterMonths as [string, ...string[]];

export const academicSemesterSchema = z.object({
  title: z.enum(academicSemesterTitleTuple).optional(),
  year: z.string().nonempty(),
  code: z.enum(academicSemesterCodeTuple).optional(),
  startMonth: z.enum(academicSemesterMonthTuple).optional(),
  endMonth: z.enum(academicSemesterMonthTuple).optional(),
});
