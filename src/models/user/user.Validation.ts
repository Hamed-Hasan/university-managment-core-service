import { z } from 'zod';

const createUserSchema = z.object({
  id: z.string().nonempty(),
  role: z.string().nonempty(),
  password: z.string().nonempty(),
});

export default createUserSchema;