import { Router } from 'express';
import * as infoController from './controller';

const router = Router();
router.get('/', infoController.getInfo);

export const infoRouter = router;


/**
 * @swagger
 * /info:
 *   get:
 *     summary: Retrieve public profile information
 *     description: Returns the first name, last name, cursus, and a description.
 *     responses:
 *       200:
 *         description: Information successfully returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   example: "Valentin"
 *                 lastName:
 *                   type: string
 *                   example: "Bassot"
 *                 cursus:
 *                   type: string
 *                   example: "..."
 *                 description:
 *                   type: string
 *                   example: "..."
 */