import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleAsyncProvider, DrizzleProvider } from './drizzle.provider';

@Module({
  imports: [ConfigModule],
  providers: [...DrizzleProvider],
  exports: [DrizzleAsyncProvider],
})
export class DrizzleModule {}
