import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard, RolesGuard } from '../auth/auth.guard';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPublicDto } from './dto/user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Role } from '../auth/constants';
import { Roles } from '../common/decorators/roles.decorator';

@ApiCookieAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: UserPublicDto,
    isArray: true,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get user data by id' })
  @ApiResponse({
    status: 200,
    description: 'User data',
    type: UserPublicDto,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOneByIdPublic(id);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':email')
  @ApiOperation({ summary: 'Get user data by email' })
  @ApiResponse({
    status: 200,
    description: 'User data',
    type: UserPublicDto,
  })
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findOnePublic(email);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 200,
    description: 'User data',
    type: UserPublicDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update user data' })
  @ApiResponse({
    status: 200,
    description: 'Update result (if user updated, status 200)',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    description: 'Delete result (if user deleted, status 200)',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
