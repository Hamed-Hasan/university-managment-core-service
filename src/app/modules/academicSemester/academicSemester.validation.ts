import { z } from 'zod';

export const academicSemesterSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
  startDate: z.date(),
  endDate: z.date(),
  isActive: z.boolean(),
});
