import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Delete,
  Req,
  UseGuards,
  Put,
  Param,
  Query,
} from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';
import { ApiTags } from '@nestjs/swagger';
import config from 'config';
import { AuthGuard } from '@nestjs/passport';

@Controller('es')
@ApiTags('es')
export class ElasticsearchController {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  @Get('')
  async index(@Body() body) {
    return 'elasticsearch index';
  }

  @Get('templates')
  async templates(@Body() body) {
    return await this.elasticsearchService.templates();
  }

  @Get('aliases')
  async aliases(@Body() body) {
    return await this.elasticsearchService.aliases();
  }

  @Get('is-index-exists')
  async isIndexExists(@Req() req) {
    const { index } = req.query;
    return await this.elasticsearchService.isIndexExists(index);
  }

  @Delete('index-delete-alias')
  async indexDeleteExists(@Body() body) {
    const { index } = body;
    return await this.elasticsearchService.indexDeleteAlias(index);
  }

  @Put('add-quiz')
  async addQuiz(@Req() req) {
    const { index, category } = req.query;
    console.log(`[Load quiz]: index `, index);
    return await this.elasticsearchService.addQuiz({ index, category });
  }

  @Delete('delete-quiz')
  async deleteQuiz(@Req() req) {
    const { index } = req.query;
    console.log(`[Load quiz]: index `, index);
    return await this.elasticsearchService.deleteQuiz({ index });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('search-quiz')
  async searchQuiz(@Req() req) {
    const { index, text, type } = req.body;
    console.log(`[Search Quiz]: `, text, req.user);
    return await this.elasticsearchService.searchQuiz({
      text,
      index,
      type,
      userId: req.user.id,
    });
  }
}
