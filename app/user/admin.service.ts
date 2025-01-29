import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DrizzleAsyncProvider } from '../common/db/drizzle.provider';
import { schema } from '../common/db/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { users } from './user.models';
import { INITIAL_ADMIN_EMAIL, INITIAL_ADMIN_PASSWORD } from '../constants';
import logger from '../common/logger';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>
  ) {}

  async onModuleInit() {
    await this.createInitialAdmin();
  }

  private async createInitialAdmin() {
    logger.info('Creating initial admin account...');
    const adminEmail = INITIAL_ADMIN_EMAIL;
    const adminPassword = INITIAL_ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      logger.error('Initial admin credentials are not set');
      return;
    }

    const existingAdmin = await this.db.query.users.findFirst({
      where: eq(users.email, adminEmail),
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      await this.db.insert(users).values({
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin',
        role: 'ADMIN',
        active: true,
      });

      logger.succuess('Initial admin account created');
    }

    logger.info('Initial admin account already exists');
  }
}
