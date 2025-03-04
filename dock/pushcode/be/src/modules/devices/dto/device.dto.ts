import { Device } from '../entities/device.entity';

export class DeviceDto {
  id: number;
  uuid: string;
  name: string;
  content: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(device: Device) {
    this.id = device?.id;
    this.uuid = device?.uuid;
    this.name = device?.name;
    this.content = device?.content;
    this.desc = device?.desc;
    this.createdAt = device?.createdAt;
    this.updatedAt = device?.updatedAt;
  }
}
