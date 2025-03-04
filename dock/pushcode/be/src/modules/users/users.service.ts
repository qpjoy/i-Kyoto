import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './entities/user.entity';
import { genSalt, hash, compare } from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { JwtPayload } from './auth/jwt-payload.model';
import { sign } from 'jsonwebtoken';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '../../shared/config/config.service';
import { generateMetaVerse } from '../../utils/metaVerseGenerator';
import { UserProfile } from '../user-profiles/entities/user-profile.entity';
import { UserProfileDto } from '../user-profiles/dto/user-profile.dto';
import { EmailRegisterDto } from './dto/email-register.dto';
import { CodeService } from '../code/code.service';
import { Code } from '../code/entities/code.entity';
import { Device } from '../devices/entities/device.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { timer } from 'rxjs';
import { UserSubscription } from '../subscriptions/entities/user-subscription.entity';
import * as dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';
import { Op } from 'sequelize';
import { formatTimer } from 'src/utils/commonLang/libs';
dayjs.extend(duration);

@Injectable()
export class UsersService {
  private readonly jwtPrivateKey: string;

  constructor(
    @Inject('UsersRepository')
    private usersRepository: typeof User,
    @Inject('UserProfilesRepository')
    private userProfilesRepository: typeof UserProfile,
    private readonly configService: ConfigService,
    @Inject('CodesRepository')
    private codesRepository: typeof Code,
    private readonly codeService: CodeService,

    @Inject('DevicesRepository')
    private devicesRepository: typeof Device,
  ) {
    this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
  }

  async verifyMember(user) {
    const subscriptions = await user.$get('subscriptions', {
      // paranoid: true,
      // joinTableAttributes: ['userId', 'subscriptionId'],
      through: {
        where: {
          [Op.or]: [
            { expiredAt: { [Op.gt]: new Date() } },
            { expiredAt: null },
          ],
        },
      },
      // raw: true,
    });

    return subscriptions;
  }

  async verifyToken(user) {
    // const userSubs = await user.$get('subscriptions');
    const userSubs = await this.verifyMember(user);
    // console.log(`[userSub]: `, userSubs);

    let subscription = {
      isSubscripting: false,
      timer: 365,
      id: 0,
    };

    // 返回所有未过期，和未设置过期时间的计划，
    // 包含基础会员7天, amount:0
    // 基础设备2台, timer: -1，永久生效
    const subRes = userSubs.reduce(
      (acc, cur, idx) => {
        // 初始化返回变量
        let _timer = 0;
        let _amount = 0;
        let _isExpired = true;
        let currentTimer = cur.timer;
        let currentAmount = cur.amount;
        let isCurrentExpired = false;

        const now = dayjs();
        const createdAt = cur.UserSubscription.createdAt;
        const expiredAt = cur.UserSubscription.expiredAt;
        const createTimer = dayjs(createdAt);
        const expireTimer = dayjs(expiredAt);

        // 是否是添加设备，添加设备不计入会员时间，过期时间其自身另算
        // 加设备 使用createdAt，立即生效
        if (currentAmount) {
          // 永久生效
          if (currentTimer == -1) {
            currentAmount += acc.amount;
          } else {
            // 判断设备是否过期，设备时间单独计算。有个概念，会员时间加的是初始两台时间，设备时间单独计算。
            // 所以除了两台基础设备按照会员时间计算，其他设备按各自到期时间计算。
            if (!expiredAt) {
              const passedDays = now.diff(createTimer, 'days', true);

              isCurrentExpired = passedDays > cur.timer;
              // 没有过期
              if (!isCurrentExpired) {
                currentAmount += acc.amount;
              } else {
                // 设备过期了，直接设置expiredAt,不影响-1永久的情况
                cur.UserSubscription.expiredAt = createTimer
                  .add(cur.timer, 'day')
                  .toDate();
                cur.UserSubscription.save();
              }
            } else {
              // 设备存在expired，需要每条比对
              isCurrentExpired = now > expireTimer;
              // 存在expired, 并且没有过期
              if (!isCurrentExpired) {
                // const remainDays = expireTimer.diff(now, 'days', true);
                currentAmount += acc.amount;

                // console.log(`[remainDays]: `, remainDays);
                // if (cur.amount) {
                //   currentAmount = acc.amount + cur.amount;
                // } else {
                //   currentTimer = remainDays;
                // }
              }
              // 如果过期了，下次subscription就不会出现
            }
          }
          _amount = currentAmount;
          // 会员过期时间、是否过期，跟设备无关, 返回上一个是否过期
          _isExpired = acc.isExpired;
          _timer = acc.timer;
        } else {
          // 加会员 使用subscriptAt
          // timer是否为-1，如果是设备，永久生效，如果是会员，则加10年：3650天
          if (currentTimer == -1) {
            currentTimer += 3651;
            isCurrentExpired = false;
          } else {
            // 如果没有过期时间，说明还没有消费
            // expiredAt = subscriptAt + cur.timer
            if (!expiredAt) {
              // const passedDays = now.diff(createTimer, 'days', true);
              // isCurrentExpired = passedDays > cur.timer;
              // if (!isCurrentExpired) {
              //   currentTimer -= passedDays;

              //   // ()? (subscription.timer = cur.timer) : null;
              // } else {
              //   cur.UserSubscription.expiredAt = createTimer
              //     .add(cur.timer, 'day')
              //     .toDate();
              //   cur.UserSubscription.save();
              // }

              // 没有被sub, 加入待sub
              if (subscription.timer >= cur.timer) {
                subscription.timer = cur.timer;
                subscription.id = cur.UserSubscription.id;
              }
            } else {
              isCurrentExpired = now > expireTimer;
              if (!isCurrentExpired) {
                const remainDays = expireTimer.diff(now, 'days', true);
                console.log(`[remainDays]: `, remainDays);

                currentTimer = remainDays;

                subscription.isSubscripting = true;
              }
            }
          }
          _isExpired = acc.isExpired && isCurrentExpired;
          _timer = acc.timer + currentTimer;
          _amount = acc.amount;
        }
        // 1. 是否含有expiredAt
        // 如果不包含，在遍历结束后，则需要自动消费一条subscription

        // End return { 剩余天数: timer, 设备数量: amount, 是否过期: isExpired, 过期日期: expiredAt },
        return { timer: _timer, amount: _amount, isExpired: _isExpired };
      },
      { timer: 0, amount: 0, isExpired: true },
    );

    let expiredAt = '已过期';

    if (subRes.timer > 0) {
      expiredAt = formatTimer(subRes.timer);
    }

    // 如果没有正在执行的subscription, 按照timer最小的策略，开始消费一个
    if (!subscription.isSubscripting) {
      const userSub = await UserSubscription.findByPk(subscription.id);
      if (userSub) {
        userSub.subscriptAt = dayjs().toDate();
        userSub.expiredAt = dayjs().add(subscription.timer, 'day').toDate();

        await userSub.save();
      }
    }

    return {
      member: {
        ...subRes,
        expiredAt,
      },
    };
  }

  async emailRegister(emailRegisterDto: EmailRegisterDto) {
    try {
      console.log(`[emailRegisterDto]: `, emailRegisterDto);
      const code = emailRegisterDto.code;

      const deviceID = emailRegisterDto.deviceID;

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

      if (!code) {
        return {
          verified: false,
          message: '没有提供验证码！',
        };
      }
      const email = emailRegisterDto.email;

      const codeVerify = await this.codeService.verify({ email, code });
      if (!codeVerify.verified) {
        return codeVerify;
      }

      const user = new User();
      user.email = email?.trim().toLowerCase();

      const salt = await genSalt(10);
      user.password = await hash(emailRegisterDto.password, salt);

      const userData = await user.save();
      await this.codesRepository.destroy({
        where: {
          value: email,
          content: code,
          category: 'email',
        },
      });

      const device = await this.devicesRepository.create({
        content: deviceID,
      });
      await user.setDevices([device]);

      const token = await this.signToken(userData);
      return new UserLoginResponseDto(userData, token);
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
        message: '没有提供验证码！',
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

    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    await this.codesRepository.destroy({
      where: {
        value: email,
        content: code,
        category: 'email-forget-password',
      },
    });

    const userData = await user.save();
    const token = await this.signToken(userData);
    return {
      token,
      message: '密码重置成功！',
    };
  }

  async findAll() {
    const users = await this.usersRepository.findAll<User>();
    return users.map((user) => new UserDto(user));
  }

  async findAndCountAll(condition = { limit: 10, offset: 0 }) {
    const users = await this.usersRepository.findAndCountAll<User>({
      ...condition,
      order: [['created_at', 'DESC']],
    });
    const metaVerse = generateMetaVerse({
      model: User,
      createDtoClass: CreateUserDto,
      updateDtoClass: UpdateUserDto,
      dtoClass: UserDto,
    });
    const { count, rows } = users;
    return {
      count,
      rows: rows.map((user) => new UserDto(user)),
      metaVerse,
    };
  }

  async searchAll(condition: any = { limit: 10, offset: 0 }) {
    const users = await this.usersRepository.findAndCountAll<User>({
      ...condition,
      order: [['created_at', 'DESC']],
    });
    const metaVerse = generateMetaVerse({
      model: User,
      createDtoClass: CreateUserDto,
      updateDtoClass: UpdateUserDto,
      dtoClass: UserDto,
    });
    const { count, rows } = users;
    return {
      count,
      rows: rows?.length ? rows.map((user) => new UserDto(user)) : [],
      metaVerse,
    };
  }

  async getUser(id: string) {
    const user = await this.usersRepository.findByPk<User>(id);
    if (!user) {
      throw new HttpException(
        'User with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return new UserDto(user);
  }

  async getUserProfile(id: string) {
    const user = await this.usersRepository.findByPk<User>(id, {
      include: [
        {
          model: UserProfile,
        },
      ],
    });
    if (!user) {
      throw new HttpException(
        'User with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return new UserProfileDto(user);
  }

  async specialField(body) {
    if (body.password) {
      const salt = await genSalt(10);
      body.password = await hash(body.password, salt);
    }
    return body;
  }

  async setMyUserProfile(_user: any, body) {
    const user = await this.usersRepository.findOne<User>({
      where: {
        id: _user.id,
      },
      include: [
        {
          model: UserProfile,
        },
      ],
    });

    console.log(user, ' - - -this is user');
    try {
      let userProfile;
      // 只有userProfile 需要更新
      const profileEntries = Object.entries(body);
      const onlyUserProfile =
        profileEntries?.length === 1 && profileEntries[0][0] === 'userProfile';

      const noUserProfile = !body.userProfile;

      // 没有设置过userProfile
      let tag = '';
      if (!user.userProfile) {
        const profileParam: any = {};

        // 1. 只更新userProfile
        if (onlyUserProfile) {
          for (const [key, value] of Object.entries(body.userProfile)) {
            profileParam[key] = body.userProfile[key];
          }

          userProfile = await this.userProfilesRepository.build({
            userId: user.id,
            ...profileParam,
          });
          user.userProfile = userProfile;
          await user.userProfile.save();
          tag = 'no1';
        } else if (noUserProfile) {
          // 2. 只更新user
          for (const [key, value] of Object.entries(
            await this.specialField(body),
          )) {
            if (key === 'userProfile') continue;
            user[key] = body[key];
          }
          await user.save();
          tag = 'no2';
        } else {
          // 3. 都更新
          for (const [key, value] of Object.entries(body.userProfile)) {
            profileParam[key] = body.userProfile[key];
          }
          userProfile = await this.userProfilesRepository.build({
            userId: user.id,
            ...profileParam,
          });
          user.userProfile = userProfile;

          for (const [key, value] of Object.entries(
            await this.specialField(body),
          )) {
            if (key === 'userProfile') continue;
            user[key] = body[key];
          }
          await user.userProfile.save();
          await user.save();
          tag = 'no3';
        }
      } else {
        // 设置过userProfile

        // 1. 只更新userProfile
        if (onlyUserProfile) {
          for (const [key, value] of Object.entries(body.userProfile)) {
            user.userProfile[key] = body.userProfile[key];
          }
          await user.userProfile.save();
          tag = 'yes1';
        } else if (noUserProfile) {
          // 2. 只更新user
          for (const [key, value] of Object.entries(
            await this.specialField(body),
          )) {
            if (key === 'userProfile') continue;
            user[key] = body[key];
          }
          await user.save();
          tag = 'yes2';
        } else {
          // 3. 都更新
          for (const [key, value] of Object.entries(body.userProfile)) {
            user.userProfile[key] = body.userProfile[key];
          }
          for (const [key, value] of Object.entries(
            await this.specialField(body),
          )) {
            if (key === 'userProfile') continue;
            user[key] = body[key];
          }
          await user.userProfile.save();
          await user.save();
          tag = 'yes3';
        }
      }

      console.log(`[set UserProfile]: ${tag} `, user, tag);
      return new UserProfileDto(user);
    } catch (err) {
      console.log(`[setUserProfile]: `, err);
      return {
        code: -1,
        err,
        message: '设置用户信息出错',
      };
    }
  }

  // set
  async setUserProfile(user: UserProfileDto, body) {
    console.log(`[set UserProfileDto]: `, user);
    try {
      const userModel: any = await this.usersRepository.findByPk<User>(
        user.id,
        {
          include: [
            {
              model: UserProfile,
            },
          ],
        },
      );

      let userProfile;
      if (userModel) {
        userProfile = userModel.userProfile;
        if (userProfile) {
          for (const [key, value] of Object.entries(body.userProfile)) {
            userProfile[key] = body.userProfile[key];
          }
          await userProfile.save();
        } else {
          userProfile = new UserProfile();
          for (const [key, value] of Object.entries(body.userProfile)) {
            userProfile[key] = body.userProfile[key];
          }
          await userProfile.save();
        }
        console.log(`[userModel]`, userModel, userProfile);
        return new UserDto(userModel);
      } else {
        return {
          code: 1,
          message: 'USER NOT FOUND',
        };
      }
    } catch (err) {
      console.log(`[setUserProfile]: `, err);
      return {
        code: -1,
        err,
        message: '设置用户信息出错',
      };
    }
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne<User>({
      where: { email },
    });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      console.log(`[User]: create `, createUserDto);
      const user = new User();
      user.email = createUserDto.email?.trim().toLowerCase();
      // TODO: salt username
      user.userName = createUserDto.name?.trim().toLowerCase();
      // user.firstName = createUserDto.firstName;
      // user.lastName = createUserDto.lastName;
      // user.gender = createUserDto.gender;
      // user.birthday = createUserDto.birthday;

      const salt = await genSalt(10);
      user.password = await hash(createUserDto.password, salt);

      const userData = await user.save();

      // when registering then log user in automatically by returning a token
      const token = await this.signToken(userData);
      return new UserLoginResponseDto(userData, token);
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

  async login(userLoginRequestDto: UserLoginRequestDto) {
    const email = userLoginRequestDto.email;
    const password = userLoginRequestDto.password;
    const deviceID = userLoginRequestDto.deviceID;

    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const deviceCount = await user.countDevices();

    const userRes = await this.verifyToken(user);
    console.log(`[deviceCount]: `, deviceCount, userRes);
    if (deviceCount < userRes?.member.amount) {
      const [device, created] = await this.devicesRepository.findOrCreate({
        where: { content: deviceID },
        defaults: {
          // user_id: user.id,
          content: deviceID,
        },
      });
      await user.addDevice(device);
    }

    const token = await this.signToken(user);
    return {
      member: userRes,
      ...new UserLoginResponseDto(user, token),
    };
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findByPk<User>(uuid);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    console.log(`[Update KV]: `, updateUserDto, user);
    // user.firstName = updateUserDto.firstName || user.firstName;
    // user.lastName = updateUserDto.lastName || user.lastName;
    // user.gender = updateUserDto.gender || user.gender;
    // user.birthday = updateUserDto.birthday || user.birthday;

    for (const [key, value] of Object.entries(updateUserDto)) {
      console.log(`[Update KV] in: `, key, value);
      user[key] = updateUserDto[key];
    }

    try {
      const data = await user.save();
      return {
        code: 0,
        data: new UserDto(data),
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    const user = await this.usersRepository.findByPk<User>(id);
    if (!user) {
      return {
        code: 0,
        data: {},
        message: 'User is already not exist!',
      };
    }
    await user.destroy();
    return new UserDto(user);
  }

  async deleteIds(ids: [string | number]) {
    if (!ids?.length) {
      throw new HttpException('Params error', HttpStatus.BAD_REQUEST);
    }
    const usersDeleteRes = await this.usersRepository.destroy<User>({
      where: {
        id: ids,
      },
    });
    console.log(usersDeleteRes, ' -- - - this is user delete');
    // await user.destroy();
    if (usersDeleteRes) {
      return {
        deletedUserNumers: usersDeleteRes,
      };
    } else {
      throw new HttpException(
        'Delete Users Fail',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signToken(user: User) {
    const payload: JwtPayload = {
      email: user.email,
    };

    return sign(payload, this.jwtPrivateKey, { expiresIn: 604800 });
  }

  // 充会员
  async member(params: any) {
    const { subscription_name, subscription_id, email } = params;

    let subscription;
    if (subscription_name) {
      subscription = await Subscription.findOne({
        where: { name: subscription_name },
      });
    } else if (subscription_id) {
      subscription = await Subscription.findByPk(subscription_id);
    }

    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    await user.$add('subscriptions', subscription);
  }

  // 添加计划
  async addSubscription(params: any = {}) {
    const { email, subscription_name } = params;
    if (!email) {
      throw new HttpException(`没有提供email`, HttpStatus.CONFLICT);
    } else if (!subscription_name) {
      throw new HttpException(`没有提供Subscription Name`, HttpStatus.CONFLICT);
    }

    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    const subscription = await Subscription.findOne({
      where: {
        name: subscription_name,
      },
    });

    if (subscription.timer >= 0) {
      await UserSubscription.create({
        userId: user.id,
        subscriptionId: subscription.id,
        // expiredAt: dayjs().add(subscription.timer, 'day').toDate(),
      });
    } else {
      await UserSubscription.create({
        userId: user.id,
        subscriptionId: subscription.id,
      });
    }
  }

  async delSubscription(params: any = {}) {
    const { email, user_subscription_id } = params;
    if (!email) {
      throw new HttpException(`没有提供email`, HttpStatus.CONFLICT);
    } else if (!user_subscription_id) {
      throw new HttpException(
        `没有提供user_subscription_id`,
        HttpStatus.CONFLICT,
      );
    }

    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    const userSubscription =
      await UserSubscription.findByPk(user_subscription_id);
    if (!userSubscription) {
      throw new HttpException(`没有提供user_subscription`, HttpStatus.CONFLICT);
    } else if (userSubscription.userId != user.id) {
      throw new HttpException(
        `这条subscription 不属于该用户`,
        HttpStatus.CONFLICT,
      );
    }

    // Delete the entry in the join table
    await UserSubscription.destroy({
      where: {
        id: user_subscription_id,
      },
    });
  }

  // 添加设备
  async addDevice(params: any = {}) {
    const { email, amount } = params;
    if (!email) {
      throw new HttpException(`没有提供email`, HttpStatus.CONFLICT);
    } else if (!amount) {
      throw new HttpException(`没有提供amount`, HttpStatus.CONFLICT);
    }

    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    const subscription = await Subscription.findOne({
      where: {
        plan: '设备',
        amount,
      },
    });

    const us = await UserSubscription.create({
      userId: user.id,
      subscriptionId: subscription.id,
    });
    return {
      subscription,
      us,
    };
  }

  // 添加时间
  async addTimer(params: any = {}) {
    const { email, amount } = params;
    if (!email) {
      throw new HttpException(`没有提供email`, HttpStatus.CONFLICT);
    } else if (!amount) {
      throw new HttpException(`没有提供amount`, HttpStatus.CONFLICT);
    }

    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    const subscription = await Subscription.findOne({
      where: {
        title: '添加设备',
        amount,
      },
    });

    await UserSubscription.create({
      userId: user.id,
      subscriptionId: subscription.id,
    });
  }

  // async isMemberExpired(params: any) {
  //   const user1Subscriptions = await user1.$get('subscriptions');
  // }
}
