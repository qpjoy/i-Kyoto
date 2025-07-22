import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  forwardRef,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './modules/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';

import { Auth } from './auth.decorator';
import { jwtKey, jwtSecret } from '@pdf/utils/variables';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    // private userService: UserService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => AuthService))
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
      // role: { id: 3 },
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
      // return {
      //   code: -1,
      //   msg: '用户不存在！',
      // };
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('密码错误！');
      // return {
      //   code: -1,
      //   msg: '密码错误！',
      // };
    }

    const jwt = await this.jwtService.signAsync(
      {
        id: user.id,
        // secretKey: '123',
      },
      { secret: jwtSecret },
    );

    response.cookie(jwtKey, jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // ✅ only over HTTPS in prod
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return { ...user, jwt };
  }

  // @UseInterceptors(
  //   ClassSerializerInterceptor,
  //   // AuthInterceptor
  // )
  @Auth()
  @Get('user')
  async user(@Req() request: Request) {
    const id = await this.authService.userId(request);

    return this.userService.findOne({
      id,
    });
  }

  @Auth('self')
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      msg: 'Success',
    };
  }

  @Get('test')
  async test() {
    return {
      meta: 'gg',
    };
  }
}
