import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ReqLoginDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  password!: string;
}

export class ReqChangePasswordDto {
  @ApiProperty()
  @IsString()
  old_password!: string;

  @ApiProperty()
  @IsString()
  new_password!: string;
}
