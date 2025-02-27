import { z } from 'zod';

export const signupSchema = z
  .object({
    email: z.string().nonempty('An email is required').email('Please enter a valid email.'),
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters.')
      .max(15, 'Username must be no more than 15 characters.')
      .regex(/^(?![A-Z])/gm, 'Username cannot contain uppercase letters.')
      .regex(/^(?=[a-z0-9-_]+$)/gm, 'Username cannot contain special characters.'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .regex(/(?=.*[A-Z])/gm, 'Password must contain an uppercase letter.')
      .regex(/(?=.*[a-z])/gm, 'Password must contain a lowercase letter.')
      .regex(/(?=.*\d)/gm, 'Password must contain at least one number.')
      .regex(/(?=.*\W)/gm, 'Password must contain at least one special character.'),
    verify: z.string().nonempty('Passwords do not match.'),
  })
  .refine((schema) => schema.password !== 'Password123!', {
    message: "You can't use the example password, silly",
    path: ['password'],
  })
  .refine((schema) => schema.verify === schema.password, {
    message: "Passwords don't match",
    path: ['verify'],
  });

export type SignUpSchema = typeof signupSchema;
