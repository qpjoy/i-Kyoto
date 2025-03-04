import { Message } from '../entities/messages.entity';
import * as dayjs from 'dayjs';

export class MessageDto {
  id: number;
  uuid: string;
  name: string;
  title: string;
  content: string;
  type: string;
  url: string;
  desc: string;
  isActive: boolean;
  others: object;
  time: any;

  createdAt: Date;
  updatedAt: Date;

  constructor(message: Message) {
    this.id = message?.id;
    this.uuid = message?.uuid;
    this.name = message?.name;
    this.title = message?.title;
    this.content = message?.content;
    this.type = message?.type;
    this.url = message?.url;
    this.desc = message?.desc;
    this.isActive = message?.isActive;
    this.createdAt = message?.createdAt;
    this.time = dayjs(message?.createdAt).format('YYYY-MM-DD');
    this.updatedAt = message?.updatedAt;
  }
}
