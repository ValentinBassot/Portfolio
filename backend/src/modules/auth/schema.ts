import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.number().int(),
    email: z.string().email(),
    name: z.string().nullable(),
  }),
});

export const currentUserSchema = z.object({
  id: z.number().int(),
  email: z.string().email(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type CurrentUserResponse = z.infer<typeof currentUserSchema>;