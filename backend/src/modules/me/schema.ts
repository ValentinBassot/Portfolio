import { z } from 'zod';

export const meSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  cursus: z.string(),
  description: z.string(),
});

export type MeResponse = z.infer<typeof meSchema>;