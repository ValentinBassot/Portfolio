import { Router } from 'express';
import * as githubController from './controller';

const router = Router();

router.get('/repos', githubController.getRepos);

export const githubRouter = router;

/**
 * @swagger
 * /github/repos:
 *   get:
 *     summary: Récupère les repos GitHub groupés par équipe
 *     responses:
 *       200:
 *         description: Liste des repos
 */
