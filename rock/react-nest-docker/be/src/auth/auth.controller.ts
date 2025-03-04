import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './modules/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}
  @Post('register')
  async register(@Body() body: RegisterDto) {
    if (body.password !== body.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashed = await bcrypt.hash(body.password, 12);
    return this.userService.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: hashed,
      full_name: body.first_name + body.last_name,
      role: { id: 3 },
    });
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    // @Res() response: Response,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new NotFoundException('用户不存在！');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('密码错误！');
    }

    const jwt = await this.jwtService.signAsync(
      {
        id: user.id,
        // secretKey: '123',
      },
      { secret: 'secret123' },
    );

    response.cookie('jwt', jwt, { httpOnly: true });

    return { ...user, jwt };
  }

  // @UseInterceptors(
  //   ClassSerializerInterceptor,
  //   // AuthInterceptor
  // )
  @UseGuards(AuthGuard)
  @Get('user')
  async user(@Req() request: Request) {
    const id = await this.authService.userId(request);

    return this.userService.findOne({
      id,
    });
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'Success',
    };
  }
}
