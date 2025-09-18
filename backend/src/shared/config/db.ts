import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import { config } from 'dotenv';

import { REVERSED_DB_PORT } from '@constants';
import { logger } from '@utils';

config();

export const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || REVERSED_DB_PORT,
  logging: (msg) => logger.debug(msg),
  clientMinMessages: 'notice',
  logQueryParameters: true,
  benchmark: true,
});

export const dbAuthenticate = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Models synchronized successfully');
    await sequelize.sync({ alter: true });
    logger.info('Database connection established');
  } catch (e) {
    logger.error('Database connection/sync failed', e);

    throw e;
  }
};
