import { Router } from 'express';
import * as healthController from './controller';

const router = Router();
router.get('/', healthController.getHealth);

export const healthRouter = router;

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check API state
 *     description: Returns a 200 status if the API is online.
 *     responses:
 *       200:
 *         description: The API is operational.
 */
