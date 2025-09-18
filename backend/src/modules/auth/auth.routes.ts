import { Router } from 'express';

import {
  AUTH_SIGN_UP_ROUTE,
  AUTH_SIGN_IN_ROUTE,
  AUTH_LOGOUT_ROUTE,
} from '@constants';

import { signUp, signIn, signOut } from './auth.controller';
import { validateErrors } from './auth.errors';
import { authenticateUserByJwt } from './auth.middleware';

export const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Аутентификация и регистрация пользователей
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
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
 *               username:
 *                 type: string
 *                 example: admin4ik
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123!
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User successfully registered!
 *       400:
 *         description: Ошибка валидации
 *       500:
 *         description: Внутренняя ошибка сервера
 */
authRouter.post(AUTH_SIGN_UP_ROUTE, signUp);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Аутентификация пользователя
 *     tags: [Auth]
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
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123!
 *     responses:
 *       200:
 *         description: Успешная аутентификация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Неверный формат запроса
 *       401:
 *         description: Неверные учетные данные
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
authRouter.post(AUTH_SIGN_IN_ROUTE, signIn);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Выход из системы
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешный выход из системы
 *       401:
 *         description: Неавторизованный доступ
 *       500:
 *         description: Ошибка сервера
 */
authRouter.post(AUTH_LOGOUT_ROUTE, authenticateUserByJwt, signOut);

authRouter.use(validateErrors);
