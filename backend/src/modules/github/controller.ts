import { Request, Response } from 'express';
import * as githubService from './service';
import { prisma } from '../../lib/prisma';

export const getRepos = async (req: Request, res: Response): Promise<void> => {
  try {
    const CACHE_KEY = 'grouped-repos';
    let data;

    const cached = await prisma.githubCache.findUnique({
      where: { key: CACHE_KEY }
    });

    if (cached) {
      data = cached.data;
      res.status(200).json(data);

      const CACHE_TTL_MS = 60 * 60 * 1000;
      const now = new Date();
      if (now.getTime() - cached.updatedAt.getTime() > CACHE_TTL_MS) {
        githubService.fetchGroupedRepos()
          .then((freshData) => {
            return prisma.githubCache.update({
              where: { key: CACHE_KEY },
              data: { data: freshData as any }
            });
          })
          .catch(console.error);
      }
      return;
    }

    data = await githubService.fetchGroupedRepos();
    
    res.status(200).json(data);

    prisma.githubCache.upsert({
      where: { key: CACHE_KEY },
      update: { data: data as any },
      create: { key: CACHE_KEY, data: data as any }
    }).catch(console.error);

  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Failed to fetch GitHub repositories';
    res.status(500).json({ error: message });
  }
};
