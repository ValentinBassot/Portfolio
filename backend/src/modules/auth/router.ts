import { Router } from 'express';
import * as authController from './controller';
import { validate } from '../../middleware/validate';
import { secure } from '../../middleware/secure';
import { loginSchema, registerSchema } from './schema';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', secure, authController.getMe);

export const authRouter = router;

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
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
 *         description: Utilisateur créé et authentifié.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - token
 *                 - user
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   required:
 *                     - id
 *                     - email
 *                     - name
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: user@example.com
 *                     name:
 *                       type: string
 *                       nullable: true
 *                       example: Valentin
 *       400:
 *         description: Données invalides.
 *       409:
 *         description: Email déjà utilisé.
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - token
 *                 - user
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   required:
 *                     - id
 *                     - email
 *                     - name
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: user@example.com
 *                     name:
 *                       type: string
 *                       nullable: true
 *                       example: Valentin
 *       400:
 *         description: Données invalides.
 *       401:
 *         description: Identifiants invalides.
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Retourne l'utilisateur contenu dans le token JWT
 *     description: Route protégée qui lit les informations du token via le middleware secure.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur authentifié.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - email
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: user@example.com
 *       401:
 *         description: Token manquant ou invalide.
 */