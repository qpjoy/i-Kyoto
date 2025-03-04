import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class DevicesService {
  constructor(
    @Inject('DevicesRepository')
    private readonly devicesRepository: typeof Device,
    @Inject('UsersRepository')
    private readonly usersRepository: typeof User,
    private readonly userService: UsersService,
  ) {}

  async create(userId, createDeviceDto: any) {
    const user = await this.usersRepository.findByPk<User>(userId);
    if (!user) {
      throw new HttpException(
        'User with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const device = await this.devicesRepository.create(createDeviceDto);
    const res = await user.setDevices(device);
    console.log(`[res]: `, res);
    return device;
  }

  async findMine(user) {
    const devices = await user.getDevices();
    console.log(`[devices]: `, devices);
    const member = await this.userService.verifyToken(user);
    return {
      ...member,
      devices,
    };
  }

  findAll() {
    return `This action returns all devices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} device`;
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
