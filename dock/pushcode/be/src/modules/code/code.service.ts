import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as dayjs from 'dayjs';
import { UpdateCodeDto } from './dto/update-code.dto';
import { Code } from './entities/code.entity';
import { send, forgetPassword } from '../../utils/services/mail';
import { User } from '../users/entities/user.entity';
import { Device } from '../devices/entities/device.entity';

const gapTime = 60 * 10 * 1000;

@Injectable()
export class CodeService {
  constructor(
    @Inject('CodesRepository')
    private codesRepository: typeof Code,
    @Inject('UsersRepository')
    private usersRepository: typeof User,
    @Inject('DevicesRepository')
    private devicesRepository: typeof Device,
  ) {}

  async create(id: any) {
    const codeNum = crypto.randomInt(100000, 1000000);
    const code = new Code();
    code.content = `${codeNum}`;
    code.category = 'email';
    code.value = id;
    const now = new Date();
    // const time = now.getTime;
    const expireAt = new Date(now.getTime() + 60 * 10 * 1000);
    console.log(`[Time]: `, now, expireAt, codeNum);
    code.expireAt = expireAt;
    // code.expireAt = new Date();
    const codeData = await code.save();
    return codeData;
  }

  async send({ email, deviceID }: any) {
    if (!email) {
      return {
        code: -1,
        message: '没有邮箱',
      };
    }

    const existDevice = await this.devicesRepository.findOne({
      where: {
        content: deviceID,
      },
    });
    if (existDevice) {
      throw new HttpException(
        `该设备已注册账号，请直接登录。如需注册新账号，请联系客服service@memoscard.com`,
        HttpStatus.CONFLICT,
      );
    }

    const user = await this.usersRepository.findOne({
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

    const coding = await this.codesRepository.findOne({
      where: {
        value: email,
        category: 'email',
      },
    });
    console.log(`[Coding]: `, coding);
    if (coding) {
      const now = new Date();
      const time = coding.expireAt;
      console.log(`[Timer]: `, now.getTime(), time.getTime());

      if (now.getTime() > time.getTime()) {
        // 验证码过期
        await coding.destroy();
      } else {
        // 验证码没有过期
        await send({
          code: coding.content,
          email,
        });
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
    const codeData = await code.save();

    await send({
      code: code.content,
      email,
    });
    return codeData;
  }

  async forget({ email }: any) {
    if (!email) {
      return {
        code: -1,
        message: '没有邮箱',
      };
    }
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        code: -1,
        message: '用户不存在！',
      };
    }
    const coding = await this.codesRepository.findOne({
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
        await coding.destroy();
      } else {
        // 验证码没有过期
        await forgetPassword({
          code: coding.content,
          email,
        });
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
    const codeData = await code.save();

    await forgetPassword({
      code: code.content,
      email,
    });
    return codeData;
  }

  async verify({ email, code, category = 'email' }: any) {
    // Code;
    console.log(`[Verify]: content `, email, code, category);
    const coding = await this.codesRepository.findOne({
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
          message: '验证码已过期！',
        };
      }
      return {
        verified: true,
        message: '验证通过！',
      };
    } else {
      return {
        verified: false,
        message: '验证码不存在',
      };
    }
  }

  async findAll() {
    const all = await this.codesRepository.findAll();
    console.log(`[All]: `, all);
    return all;
  }

  findOne(id: number) {
    return `This action returns a #${id} code`;
  }

  update(id: number, updateCodeDto: UpdateCodeDto) {
    return `This action updates a #${id} code`;
  }

  async remove(id: number) {
    const codeRes = await this.codesRepository.destroy({
      where: {
        id: 7,
      },
    });
    console.log(`[codeRes]: `, codeRes);
    return codeRes;
  }
}
