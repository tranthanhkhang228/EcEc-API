import * as cors from 'cors';

function getOptional(name: string): string | null {
  return process.env[name] || null;
}

function getRequired(name: string): string {
  console.log(name);
  console.log(process.env.TYPEORM_URL);
  const val = getOptional(name);
  if (!val) {
    throw new Error(`${name} environment variable is required.`);
  }
  return val;
}

export const CORS_OPTIONS: cors.CorsOptions = {
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: (_origin, callback) => {
    // if (!origin || whitelist.indexOf(origin) !== -1) {
    //   callback(null, true);
    // } else {
    //   callback(new Error('Not allowed by CORS'));
    // }
    callback(null, true);
  }
};

export const NODE_ENV = getOptional('NODE_ENV') || 'development';
export const IS_DEVELOPMENT = NODE_ENV !== 'production';

// PostgreSQL
export const TYPEORM_URL = getRequired('TYPEORM_URL');
export const DB_MIGRATION = getOptional('DB_MIGRATION')
  ? getOptional('DB_MIGRATION')
  : IS_DEVELOPMENT
  ? 'alter'
  : 'safe';
export const DB_POOL_SIZE = getOptional('DB_POOL_SIZE') || 30;
export const DB_SEED =
  (getOptional('DB_SEED') || 'false').toLowerCase() === 'true';
