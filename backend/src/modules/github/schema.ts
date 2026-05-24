import { z } from 'zod';

export const githubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  html_url: z.string().url(),
  description: z.string().nullable(),
  updated_at: z.string().optional(),
});

export const githubGroupedSchema = z.object({
  epitech: z.array(githubRepoSchema),
  epitechGrouped: z.record(z.string(), z.array(githubRepoSchema)),
  epitechUngrouped: z.array(githubRepoSchema),
  poc: z.array(githubRepoSchema),
  others: z.array(githubRepoSchema),
});

export type GitHubRepo = z.infer<typeof githubRepoSchema>;
export type GitHubGrouped = z.infer<typeof githubGroupedSchema>;

export default githubGroupedSchema;
