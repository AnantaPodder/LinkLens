import { z } from 'zod';

export const RegisterUserSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  firstname: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters'),
  lastname: z
    .string()
    .max(50, 'Last name must be less than 50 characters')
    .optional()
    .transform(val => val || ''), // Transform undefined to empty string to match schema
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

export type RegisterUserDto = {
  email: string;
  firstname: string;
  lastname?: string;
  password: string;
};

export const RegisterUserResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    id: z.number(),
    email: z.string(),
    firstname: z.string(),
    lastname: z.string().nullable(),
  }),
  message: z.string(),
});

export type RegisterUserResponse = z.infer<typeof RegisterUserResponseSchema>;
