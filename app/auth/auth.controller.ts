import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ReqChangePasswordDto, ReqLoginDto } from './dto/auth.dto';

@ApiCookieAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'Successful login. HttpOnly cookie access_token will be set',
  })
  signIn(@Body() data: ReqLoginDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.signIn(data.email, data.password, response);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Profile' })
  @ApiResponse({
    status: 200,
    description: 'Your user data',
    type: () => String,
  })
  getProfile(@Request() req: any) {
    return this.authService.profile(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('change-password')
  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({
    status: 200,
    description: 'Successful password change',
  })
  changePassword(@Body() data: ReqChangePasswordDto, @Request() req: any) {
    return this.authService.changePassword(req.user.sub, data.old_password, data.new_password);
  }
}
