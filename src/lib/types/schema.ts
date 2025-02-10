import { z } from 'zod';

export const newChannelSchema = z.object({
  channelName: z.string().min(1, 'Channel name is required'),
});

export const signupSchema = z
  .object({
    email: z.string().nonempty('An email is required').email('Please enter a valid email.'),
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters.')
      .regex(/^(?![A-Z])/gm, 'Username cannot contain uppercase letters')
      .regex(/^(?=[a-z0-9-_]+$)/gm, 'Username cannot contain special characters'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .regex(/(?=.*[A-Z])/gm, 'Password must contain at uppercase letter.')
      .regex(/(?=.*[a-z])/gm, 'Password must contain at lowercase letter.')
      .regex(/(?=.*\d)/gm, 'Password must contain at least one number.')
      .regex(/(?=.*\W)/gm, 'Password must contain at least one special character'),
    verify: z.string().nonempty('Passwords do not match.'),
  })
  .refine((schema) => schema.verify === schema.password, {
    message: "Passwords don't match",
    path: ['verify'],
  });

export const loginSchema = z.object({
  email: z.string().nonempty('An email is required').email('Please enter a valid email.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .regex(/(?=.*[A-Z])/gm, 'Password must contain at uppercase letter.')
    .regex(/(?=.*[a-z])/gm, 'Password must contain at lowercase letter.')
    .regex(/(?=.*\d)/gm, 'Password must contain at least one number.')
    .regex(/(?=.*\W)/gm, 'Password must contain at least one special character'),
});

export type NewChannelSchema = typeof newChannelSchema;
export type SignUpSchema = typeof signupSchema;
export type LogInSchema = typeof loginSchema;
