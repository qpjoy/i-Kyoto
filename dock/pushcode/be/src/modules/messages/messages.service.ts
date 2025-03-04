import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/messages.entity';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @Inject('MessagesRepository')
    private messagesRepository: typeof Message,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    try {
      console.log(`[createMessageDto]: `, createMessageDto);
      try {
        return await this.messagesRepository.create<Message>(createMessageDto);
      } catch (e) {
        console.log(`[e]: `, e);
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    const messages = await this.messagesRepository.findAll<Message>({
      order: [['createdAt', 'DESC']],
    });
    return messages.map((message) => new MessageDto(message));
  }

  async findOne(id: number) {
    return await this.messagesRepository.findByPk(id);
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const message = await this.messagesRepository.findByPk<Message>(id);
    if (!message) {
      throw new HttpException('message not found.', HttpStatus.NOT_FOUND);
    }
    for (const [key, value] of Object.entries(updateMessageDto)) {
      console.log(`[Update KV] in: `, key, value);
      message[key] = updateMessageDto[key];
    }

    try {
      const data = await message.save();
      return {
        code: 0,
        data: new MessageDto(data),
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    const message = await this.messagesRepository.findByPk<Message>(id);
    if (!message) {
      return {
        code: 0,
        data: {},
        message: 'message is already not exist!',
      };
    }
    await message.destroy();
    return new MessageDto(message);
  }
}
