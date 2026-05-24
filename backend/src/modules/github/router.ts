import { Router } from 'express';
import * as githubController from './controller';

const router = Router();

router.get('/repos', githubController.getRepos);
router.get('/readme', githubController.getReadme);

export const githubRouter = router;

/**
 * @swagger
 * /github/repos:
 *   get:
 *     summary: Retrieve GitHub repositories grouped by team
 *     responses:
 *       200:
 *         description: Liste des repos
 */
