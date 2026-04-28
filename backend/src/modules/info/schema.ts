import { z } from 'zod';

export const infoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  cursus: z.string(),
  description: z.string(),
});

export type InfoResponse = z.infer<typeof infoSchema>;