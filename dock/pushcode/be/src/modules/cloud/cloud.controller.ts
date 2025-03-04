// import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import * as crypto from 'crypto';
import { CloudService } from './cloud.service';
import { CreateCloudDto } from './dto/create-cloud.dto';
import { UpdateCloudDto } from './dto/update-cloud.dto';

import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

// @ApiTags('cloud')
@Controller('cloud')
export class CloudController {
  constructor(private readonly cloudService: CloudService) {}

  @Get('/')
  findAll() {
    return { wtf: 'wft' };
  }

  @Get('get-sign')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async Sign(@Req() req) {
    const { ext } = req.query;
    const user = req.user;
    return await this.cloudService.getSign({
      user,
      ext,
    });
  }

  @Post('ocr')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async ocr(@Req() req, @Body() body) {
    const params = {
      url: body.url,
    };
    return await this.cloudService.ocr(params);
  }
}
