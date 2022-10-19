import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

import build from './application';
import db from './config/database';

const port = process.env.PORT || 3000;

const fastify = build();

const start = async () => {
  try {
    await db.authenticate();
    await fastify.listen(port, '0.0.0.0');
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
