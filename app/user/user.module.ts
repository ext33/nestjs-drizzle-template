import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { AdminService } from './admin.service';
import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { DrizzleModule } from '../common/db/drizzle.module';

@Module({
  imports: [AuthModule, DrizzleModule],
  controllers: [UserController],
  providers: [UsersService, JwtService, AdminService],
  exports: [UsersService],
})
export class UserModule {}
