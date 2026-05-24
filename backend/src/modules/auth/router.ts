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
 *     summary: Creates a new user
 *     description: Creates a user account and returns a JWT token.
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
 *         description: User successfully created and authenticated.
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
 *         description: Invalid data.
 *       409:
 *         description: Email already in use.
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Authenticates a user
 *     description: Verifies credentials and returns a JWT token.
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
 *         description: Successful authentication.
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
 *         description: Invalid data.
 *       401:
 *         description: Identifiants invalides.
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Returns the user from the JWT token
 *     description: Protected route that reads token data via the secure middleware.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user.
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