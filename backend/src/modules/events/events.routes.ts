import { Router } from 'express';

import {
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  addParticipant,
  removeParticipant,
  getEventParticipants,
} from './events.controller';
import { validateErrors } from './events.errors';

export const eventsRouter = Router();

// Существующие роуты...
/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - date
 *         - createdBy
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         title:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *           example: Концерт группы
 *         description:
 *           type: string
 *           example: Описание мероприятия
 *         date:
 *           type: string
 *           format: date-time
 *           example: 2025-02-16T23:50:21.817Z
 *         createdBy:
 *           type: integer
 *           example: 1
 *         participants:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *     EventParticipant:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         eventId:
 *           type: integer
 *         userId:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         email:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Управление мероприятиями
 */

eventsRouter.get('/:id', getEventById);
eventsRouter.post('/', createEvent);
eventsRouter.put('/:id', updateEvent);
eventsRouter.delete('/:id', deleteEvent);

// Новые роуты для участников
/**
 * @swagger
 * /events/{eventId}/participants:
 *   post:
 *     summary: Добавить участника к мероприятию
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Участник добавлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventParticipant'
 *       404:
 *         description: Мероприятие или пользователь не найдены
 *       409:
 *         description: Пользователь уже является участником
 *       500:
 *         description: Ошибка сервера
 */
eventsRouter.post('/:eventId/participants', addParticipant);

/**
 * @swagger
 * /events/{eventId}/participants/{userId}:
 *   delete:
 *     summary: Удалить участника из мероприятия
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Участник удален
 *       404:
 *         description: Участник не найден
 *       500:
 *         description: Ошибка сервера
 */
eventsRouter.delete('/:eventId/participants/:userId', removeParticipant);

/**
 * @swagger
 * /events/{eventId}/participants:
 *   get:
 *     summary: Получить список участников мероприятия
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Список участников
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Мероприятие не найдено
 *       500:
 *         description: Ошибка сервера
 */
eventsRouter.get('/:eventId/participants', getEventParticipants);

eventsRouter.use(validateErrors);
