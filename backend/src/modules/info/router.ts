import { Router } from 'express';
import * as infoController from './controller';

const router = Router();
router.get('/', infoController.getInfo);

export const infoRouter = router;


/**
 * @swagger
 * /info:
 *   get:
 *     summary: Récupère les informations publiques du profil
 *     description: Renvoie le nom, prénom, cursus et une description.
 *     responses:
 *       200:
 *         description: Informations renvoyées avec succès.
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