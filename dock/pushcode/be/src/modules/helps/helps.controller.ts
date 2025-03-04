import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { HelpsService } from './helps.service';
import { CreateHelpDto } from './dto/create-help.dto';
import { UpdateHelpDto } from './dto/update-help.dto';

@Controller('helps')
export class HelpsController {
  constructor(private readonly helpsService: HelpsService) {}

  @Post()
  async create(@Body() createHelpDto: CreateHelpDto) {
    return await this.helpsService.create(createHelpDto);
  }

  @Get()
  async findAll() {
    return await this.helpsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.helpsService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateHelpDto: UpdateHelpDto) {
    return await this.helpsService.update(+id, updateHelpDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.helpsService.remove(+id);
  }
}
