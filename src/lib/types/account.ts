import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty('Password must not be empty.'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters.')
      .regex(/(?=.*[A-Z])/gm, 'New password must contain at uppercase letter.')
      .regex(/(?=.*[a-z])/gm, 'New password must contain at lowercase letter.')
      .regex(/(?=.*\d)/gm, 'New password must contain at least one number.')
      .regex(/(?=.*\W)/gm, 'New password must contain at least one special character'),
  })
  .refine((schema) => schema.newPassword !== 'Password123!', {
    message: "You can't use the example password, silly",
    path: ['newPassword'],
  })
  .refine((schema) => schema.currentPassword !== schema.newPassword, {
    message: 'New password cannot be the same as old password.',
    path: ['newPassword'],
  });

export const changeUsernameSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters.')
    .max(15, 'Username must be no more than 15 characters.')
    .regex(/^(?![A-Z])/gm, 'Username cannot contain uppercase letters')
    .regex(/^(?=[a-z0-9-_]+$)/gm, 'Username cannot contain special characters'),
});

export type ChangePasswordSchema = typeof changePasswordSchema;
export type ChangeUsernameSchema = typeof changeUsernameSchema;
