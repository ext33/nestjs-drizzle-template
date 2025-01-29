import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as userSchema from '../../user/user.models';
import { DATABASE_URL } from '../../constants';

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const schema = {
  ...userSchema,
};

export const DrizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    inject: [ConfigService],
    useFactory: async () => {
      const connectionString = DATABASE_URL;
      const pool = new Pool({
        connectionString,
      });

      return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
    },
  },
];
