import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

export default defineConfig({
  dialect: 'postgresql',
  schema: './app/**/*.models.ts',
  out: './app/db/migrations',
  dbCredentials: {
    url: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  },
});
