import { Router } from 'express';

import {
  getAllUsers,
  createUser,
  getCurrentUser,
  getUser,
} from './users.controller';
import { validateErrors } from './users.errors';

export const usersRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: Иван Иванов
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-02-16T23:50:21.817Z
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Управление пользователями
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Получить всех пользователей
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Ошибка сервера
 */
usersRouter.get('/', getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Создать нового пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Созданный пользователь
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Неверные данные
 *       500:
 *         description: Ошибка сервера
 */
usersRouter.post('/', createUser);

/**
 * @swagger
 * /users/whoami:
 *   get:
 *     summary: Получить информацию о текущем пользователе
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Информация о пользователе
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Не авторизован
 *       500:
 *         description: Ошибка сервера
 */
usersRouter.get('/whoami', getCurrentUser);
usersRouter.get('/:id', getUser);

usersRouter.use(validateErrors);
