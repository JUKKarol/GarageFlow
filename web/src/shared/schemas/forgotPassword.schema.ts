import { z } from 'zod';

export const EmailSchema = z.object({
  email: z.string().email('Invalid email address')
});

export const ResetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  resetCode: z.string().min(6, 'Reset code must be at least 6 characters'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*()]/, 'Password must contain at least one special character'),
});