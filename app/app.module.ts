import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DrizzleModule } from './common/db/drizzle.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, DrizzleModule],
})
export class AppModule {}
