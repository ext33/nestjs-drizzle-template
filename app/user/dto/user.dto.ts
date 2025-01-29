import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEmail, IsString } from 'class-validator';

export class UserPublicDto {
  @ApiProperty()
  @IsString()
  id!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  avatar?: string | null;

  @ApiProperty()
  @IsString()
  role!: string;

  @ApiProperty()
  @IsBoolean()
  active!: boolean;
}

export class UserPrivateDto extends UserPublicDto {
  @ApiProperty()
  @IsString()
  password!: string;

  @ApiProperty()
  @IsDate()
  createdAt!: Date;

  @ApiProperty()
  @IsDate()
  updatedAt!: Date;

  @ApiProperty()
  @IsDate()
  deletedAt?: Date | null;
}
