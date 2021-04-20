import { ConnectionOptions } from 'typeorm';
import path from 'path';
import { DB_MIGRATION, DB_POOL_SIZE, TYPEORM_URL } from '../config';

const config: ConnectionOptions = {
  type: 'postgres',
  url: TYPEORM_URL,
  synchronize: DB_MIGRATION === 'safe' ? false : true,
  logging: 'all',
  entities: [path.join(__dirname, '../models/*.{js,ts}')],
  extra: { max: DB_POOL_SIZE }
};

export default config;
