import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { UsersService } from '../user/user.service';
import { ACCESS_TOKEN, encryptionConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string, response: Response): Promise<void> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new NotFoundException();
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: encryptionConstants.secret,
    });

    // TODO add refresh token

    response.cookie(ACCESS_TOKEN, access_token, {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return;
  }

  async profile(id: string) {
    const user = await this.usersService.findOneByIdPublic(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async changePassword(id: string, old_password: string, new_password: string) {
    const user = await this.usersService.findOneById(id);

    if (!user) {
      throw new NotFoundException();
    }

    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect');
    }

    await this.usersService.updatePassword(id, new_password);
  }
}
