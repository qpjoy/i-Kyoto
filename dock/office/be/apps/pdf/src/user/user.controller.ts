import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  LoggerService,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from './models/user-create.dto';

import { UserUpdateDto } from './models/user-update.dto';
import { AuthService } from '@pdf/auth/auth.service';
import { Request, Response } from 'express';
import { HasPermission } from '@pdf/permission/has-permission.decorator';
import { Auth } from '@pdf/auth/auth.decorator';

import { EmailRegisterDto } from './dto/email-register.dto';
// import { HasPermission } from '@pdf/permission/has-permission.decorator';

@UseInterceptors(ClassSerializerInterceptor)
// @Auth()
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Get()
  @HasPermission('users')
  async all(@Query('page') page = 1) {
    const data = await this.userService.paginate(page, ['role'] as any);
    return { msg: 'dt', ...data };
  }

  @Post()
  @HasPermission('users')
  async create(@Body() body: UserCreateDto): Promise<User> {
    const password = await bcrypt.hash('1234', 12);
    const { role_id, ...data } = body;

    return this.userService.create({
      ...data,
      password,
      // role: { id: role_id },
    });
  }

  @Post('change-password')
  changePassword(@Body() changePasswordDto: any): any {
    return this.userService.changePassword(changePasswordDto);
  }

  @Post('email-register')
  emailRegister(
    @Body() emailregisterDto: EmailRegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.userService.emailRegister(emailregisterDto, response);
  }

  @Get(':id')
  @HasPermission('users')
  async get(@Param('id') id: number): Promise<User> {
    return this.userService.findOne({ id }, ['role']);
  }

  @Put('info')
  async updateInfo(@Req() request: Request, @Body() body: UserUpdateDto) {
    const id = await this.authService.userId(request);
    await this.userService.update(id, body);
    return this.userService.findOne({ id });
  }

  @Put('password')
  @HasPermission('users')
  async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
  ) {
    if (password !== password_confirm) {
      throw new BadRequestException('Passwords do not match');
    }
    const id = await this.authService.userId(request);
    const hashed = await bcrypt.hash(password, 12);
    await this.userService.update(id, {
      password: hashed,
    });
    return this.userService.findOne({ id });
  }

  @Put(':id')
  // @HasPermission('users')
  async update(
    @Param('id') id: number,
    // @Body() body: any,
    @Body() body: UserUpdateDto,
  ) {
    const { role_id, ...data } = body;
    await this.userService.update(id, {
      ...data,
      role: { id: role_id },
    });
    return this.userService.findOne({ id });
  }

  @Delete(':id')
  // @HasPermission('users')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @Patch('passwd-email')
  async passwdEmail() {
    return this.userService.passwdEmail();
  }
}
