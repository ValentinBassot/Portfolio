import { Router } from 'express';
import * as healthController from './controller';

const router = Router();
router.get('/', healthController.getHealth);

export const healthRouter = router;

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Vérifie l'état de l'API
 *     description: Retourne un statut 200 si l'API est en ligne.
 *     responses:
 *       200:
 *         description: L'API est opérationnelle.
 */