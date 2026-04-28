import { Router } from 'express';
import * as authController from './controller';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

export const authRouter = router;

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     description: Crée un compte utilisateur puis retourne un token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       201:
 *         description: Utilisateur créé.
 *       400:
 *         description: Données invalides.
 *       409:
 *         description: Email déjà utilisé.
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authentifie un utilisateur
 *     description: Vérifie les identifiants et retourne un token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentification réussie.
 *       400:
 *         description: Données invalides.
 *       401:
 *         description: Identifiants invalides.
 */