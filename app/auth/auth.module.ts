import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserController } from '../user/user.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';
import { DrizzleModule } from '../common/db/drizzle.module';

@Module({
  imports: [DrizzleModule],
  providers: [AuthService, UsersService, JwtService],
  controllers: [AuthController, UserController],
})
export class AuthModule {}
