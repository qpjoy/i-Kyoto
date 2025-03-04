import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateHelpDto } from './dto/create-help.dto';
import { UpdateHelpDto } from './dto/update-help.dto';
import { Help } from './entities/help.entity';
import { HelpDto } from './dto/help.dto';

@Injectable()
export class HelpsService {
  constructor(
    @Inject('HelpsRepository')
    private helpsRepository: typeof Help,
  ) {}

  async create(createHelpDto: CreateHelpDto) {
    try {
      console.log(`[createHelpDto]: `, createHelpDto);
      try {
        return await this.helpsRepository.create<Help>(createHelpDto);
      } catch (e) {
        console.log(`[e]: `, e);
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    const helps = await this.helpsRepository.findAll<Help>({
      order: [['createdAt', 'DESC']],
    });
    return helps.map((help) => new HelpDto(help));
  }

  async findOne(id: number) {
    return await this.helpsRepository.findByPk(id);
  }

  async update(id: number, updateHelpDto: UpdateHelpDto) {
    const help = await this.helpsRepository.findByPk<Help>(id);
    if (!help) {
      throw new HttpException('Help not found.', HttpStatus.NOT_FOUND);
    }
    for (const [key, value] of Object.entries(updateHelpDto)) {
      console.log(`[Update KV] in: `, key, value);
      help[key] = updateHelpDto[key];
    }

    try {
      const data = await help.save();
      return {
        code: 0,
        data: new HelpDto(data),
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    const help = await this.helpsRepository.findByPk<Help>(id);
    if (!help) {
      return {
        code: 0,
        data: {},
        message: 'help is already not exist!',
      };
    }
    await help.destroy();
    return new HelpDto(help);
  }
}
