import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { genSalt, hash, compare } from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { AbstractService } from '@pdf/core/abstract.service';
import { EmailRegisterDto } from './dto/email-register.dto';
import { CodeService } from '@pdf/code/code.service';
import { Code } from '@pdf/code/models/code.entity';
import { JwtService } from '@nestjs/jwt';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { jwtKey, jwtSecret } from '@pdf/utils/variables';

@Injectable()
export class UserService extends AbstractService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => CodeService))
    private readonly codeService: CodeService,
    private jwtService: JwtService,
  ) {
    super(userRepository);
  }
  async all(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(data): Promise<User> {
    return this.userRepository.save(data);
  }

  async paginate(page = 1, relations = []) {
    const { data, meta } = await super.paginate(page, relations);

    return {
      data: data.map((user) => {
        const { password, ...data } = user;
        return data;
        // return user;
      }),
      meta,
    };
  }

  async emailRegister(emailRegisterDto: EmailRegisterDto, response) {
    try {
      const code = emailRegisterDto.code;
      if (!code) {
        return {
          verified: false,
          message: '没有提供验证码！',
        };
      }
      const email = emailRegisterDto.email;
      const codeVerify = await this.codeService.verify({ email, code });
      console.log(`[codeVerify]: `, codeVerify);
      if (!codeVerify.verified) {
        return codeVerify;
      }

      const user = new User();
      user.email = email?.trim().toLowerCase();

      const salt = await genSalt(10);
      user.password = await hash(emailRegisterDto.password, salt);

      const userSave = await this.userRepository.save(user);
      console.log(`[userSave as userSaved]: `, userSave);

      // const userData = await user.save();
      await this.codeService.deleteBy({
        value: email,
        content: code,
        category: 'email',
      });

      const jwt = await this.jwtService.signAsync(
        {
          id: user.id,
          // secretKey: '123',
        },
        { secret: jwtSecret },
      );

      console.log(`[jwt in user service]: `, jwt);

      response.cookie(jwtKey, jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // ✅ only over HTTPS in prod
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      });

      // const token = await this.signToken(userData);
      return {
        ...userSave,
        token: jwt,
      };
    } catch (err) {
      if (err.original?.constraint === 'user_email_key') {
        throw new HttpException(
          `User with email '${err.errors[0].value}' already exists`,
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async changePassword(changePasswordDto: any) {
    const { email, password, code } = changePasswordDto;

    if (!code) {
      return {
        verified: false,
        msg: '没有提供验证码！',
      };
    }

    const codeVerify = await this.codeService.verify({
      email,
      code,
      category: 'email-forget-password',
    });
    if (!codeVerify.verified) {
      return codeVerify;
    }

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await this.codeService.deleteBy({
      value: email,
      content: code,
      category: 'email-forget-password',
    });

    const userData = await this.userRepository.save(user);

    const token = await this.jwtService.signAsync(
      {
        id: user.id,
        // secretKey: '123',
      },
      { secret: jwtSecret },
    );
    return {
      token,
      msg: '密码重置成功！',
    };
  }
}
