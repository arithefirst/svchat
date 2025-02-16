import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().nonempty('An email is required').email('Please enter a valid email.'),
  password: z.string().nonempty('Password must not be empty.'),
});

export type LogInSchema = typeof loginSchema;
