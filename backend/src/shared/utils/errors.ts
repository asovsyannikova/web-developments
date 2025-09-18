import type { ErrorMaps } from '@sharedTypes';
import type { Request, Response, NextFunction } from 'express';

type ErrorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export const createErrorMiddleware = (errorMap: ErrorMaps): ErrorMiddleware => {
  return (error, _req, res, next) => {
    try {
      // Если ответ уже отправлен - передаем ошибку дальше
      if (res.headersSent) {
        return next(error);
      }

      // Поиск подходящего обработчика
      const matchedHandler = errorMap.find(([condition]) => {
        try {
          return condition(error);
        } catch {
          return false;
        }
      });

      // Обработка найденного обработчика
      if (matchedHandler) {
        const [, response] = matchedHandler;
        return res.status(response.status).json({
          status: response.status,
          message: response.message,
          timestamp: new Date().toISOString(),
        });
      }

      // Дефолтная обработка
      return res.status(500).json({
        status: 500,
        message: 'Internal server error',
        timestamp: new Date().toISOString(),
      });
    } catch (middlewareError) {
      return next(middlewareError);
    }
  };
};
