import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Code } from './models/code.entity';
import { User } from '@pdf/user/models/user.entity';
import { AbstractService } from '@pdf/core/abstract.service';
import * as crypto from 'crypto';
import { UserService } from '@pdf/user/user.service';

const gapTime = 60 * 10 * 1000;

@Injectable()
export class CodeService extends AbstractService {
  constructor(
    @InjectRepository(Code) private readonly codeRepository: Repository<Code>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {
    super(codeRepository);
  }
  async all(): Promise<Code[]> {
    return this.codeRepository.find();
  }

  async create(data): Promise<Code> {
    return this.codeRepository.save(data);
  }

  async send(sendDto: any) {
    if (!sendDto) {
      return {
        code: -1,
        message: '参数为空',
      };
    }
    const { email } = sendDto;
    if (!email) {
      return {
        code: -1,
        message: '没有邮箱',
      };
    }

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return {
        code: -1,
        message: '用户已存在！',
      };
    }

    const coding = await this.codeRepository.findOne({
      where: {
        value: email,
        category: 'email',
      },
    });
    console.log(`[Coding]: `, coding);
    if (coding) {
      const now = new Date();
      const time = coding.expireAt;
      console.log(`[Timer]: `, now.getTime(), time?.getTime());

      if (now.getTime() > time.getTime()) {
        // 验证码过期
        await this.codeRepository.remove(coding);
      } else {
        // 验证码没有过期
        // await send({
        //   code: coding.content,
        //   email,
        // });
        return coding;
      }
    }

    const codeNum = crypto.randomInt(100000, 1000000);
    const code = new Code();
    code.content = `${codeNum}`;
    code.category = 'email';
    code.value = email;
    const now = new Date();
    // const time = now.getTime;
    const expireAt = new Date(now.getTime() + gapTime);
    console.log(`[Time]: `, now, expireAt, codeNum);
    code.expireAt = expireAt;
    // code.expireAt = new Date();
    const codeData = await this.codeRepository.save(code);

    // try {
    //   await send({
    //     code: code.content,
    //     email,
    //   });
    // } catch (e) {
    //   console.log(`[SendCodeError]: `, e);
    // }
    return codeData;
  }

  async forget({ email }: any) {
    if (!email) {
      return {
        code: -1,
        message: '没有邮箱',
      };
    }
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
      // return {
      //   code: -1,
      //   message: '用户不存在！',
      // };
    }
    const coding = await this.codeRepository.findOne({
      where: {
        value: email,
        category: 'email-forget-password',
      },
    });

    console.log(`[Coding]: `, coding);
    if (coding) {
      const now = new Date();
      const time = coding.expireAt;
      console.log(`[Timer]: `, now.getTime(), time.getTime());

      if (now.getTime() > time.getTime()) {
        // 验证码过期
        // await coding.destroy();
        await this.codeRepository.remove(coding);
      } else {
        // 验证码没有过期
        // await forgetPassword({
        //   code: coding.content,
        //   email,
        // });
        return coding;
      }
    }

    const codeNum = crypto.randomInt(100000, 1000000);
    const code = new Code();
    code.content = `${codeNum}`;
    code.category = 'email-forget-password';
    code.value = email;
    const now = new Date();
    // const time = now.getTime;
    const expireAt = new Date(now.getTime() + gapTime);
    console.log(`[Time]: `, now, expireAt, codeNum);
    code.expireAt = expireAt;
    // code.expireAt = new Date();
    // const codeData = await code.save();
    const codeData = await this.codeRepository.save(code);
    // await forgetPassword({
    //   code: code.content,
    //   email,
    // });
    return codeData;
  }

  async verify({ email, code, category = 'email' }: any) {
    // Code;
    console.log(`[Verify]: content `, email, code, category);
    const coding = await this.codeRepository.findOne({
      where: {
        value: email,
        category,
        content: code,
      },
    });
    if (coding) {
      // await coding.destroy();
      const now = new Date();
      const time = coding.expireAt;
      console.log(`[Timer]: `, now.getTime(), time.getTime());
      if (now.getTime() > time.getTime()) {
        return {
          verified: false,
          msg: '验证码已过期！',
        };
      }
      return {
        verified: true,
        msg: '验证通过！',
      };
    } else {
      return {
        verified: false,
        msg: '验证码不存在',
      };
    }
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

  async deleteBy(condition) {
    return await this.codeRepository.delete({
      ...condition,
    });
  }
}
