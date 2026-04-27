import { z } from 'zod';

export const healthSchema = z.object({
  status: z.string(),
  timestamp: z.string(),
});

export type HealthResponse = z.infer<typeof healthSchema>;