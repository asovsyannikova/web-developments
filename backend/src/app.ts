import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import {
  router,
  getSwaggerOptions,
  dbAuthenticate,
  configPassport,
} from '@config';
import { API_ROUTES, API_DOCS, RESERVED_PORT } from '@constants';
import { logger } from '@utils';

// Инициализация логов
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

config();

const runServer = async () => {
  try {
    await dbAuthenticate();

    const app = express();
    const PORT = Number(process.env.PORT) || RESERVED_PORT;

    const morganStream = {
      write: (message: string) => logger.http(message.trim()),
    };

    const swaggerOptions = swaggerJSDoc(getSwaggerOptions(PORT));

    app.use(cors());
    app.use(express.json());
    app.use(
      morgan('[HTTP] :method :url :status - :response-time ms', {
        stream: morganStream,
      }),
    );
    app.use(configPassport.initialize());

    app.use(API_DOCS, swaggerUi.serve, swaggerUi.setup(swaggerOptions));
    app.use(API_ROUTES, router);

    app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
      logger.info(`Docs available at http://localhost:${PORT}${API_DOCS}`);
    });
  } catch (error) {
    logger.error('Failed to initialize application', error);
    process.exit(1);
  }
};

// Обработка непойманных исключений
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection', reason);
  process.exit(1);
});

runServer();
