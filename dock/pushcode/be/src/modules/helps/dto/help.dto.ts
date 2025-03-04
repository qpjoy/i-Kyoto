import { Help } from '../entities/help.entity';

export class HelpDto {
  id: number;
  uuid: string;
  name: string;
  url: string;
  desc: string;
  isActive: boolean;
  others: object;

  createdAt: Date;
  updatedAt: Date;

  constructor(help: Help) {
    this.id = help?.id;
    this.uuid = help?.uuid;
    this.name = help?.name;
    this.url = help?.url;
    this.desc = help?.desc;
    this.isActive = help?.isActive;
    this.createdAt = help?.createdAt;
    this.updatedAt = help?.updatedAt;
  }
}
