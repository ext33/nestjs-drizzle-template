import dotenv from 'dotenv';

dotenv.config();

export const SECRET_KEY = process.env.SECRET_KEY || 'foo';
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';

export const SERVER_DOMAIN = process.env.SERVER_DOMAIN || '';
export const ALLOW_CORS = process.env.ALLOW_CORS || '*';
export const SERVER_PORT = parseInt(process.env.SERVER_PORT || '8080', 10);

export const DB_HOST = process.env.DB_HOST || '';
export const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);
export const DB_USER = process.env.DB_USER || '';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_NAME = process.env.DB_NAME || '';
export const DATABASE_URL = process.env.DATABASE_URL || '';

export const INITIAL_ADMIN_EMAIL = process.env.INITIAL_ADMIN_EMAIL || '';
export const INITIAL_ADMIN_PASSWORD = process.env.INITIAL_ADMIN_PASSWORD || '';
