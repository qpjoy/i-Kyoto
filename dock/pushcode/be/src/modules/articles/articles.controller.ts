import {
  Controller,
  Req,
  Body,
  Post,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { AuthGuard } from '@nestjs/passport';
import { Article as ArticleEntity } from './entities/article.entity';
import { ArticleDto } from './dto/article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import * as qs from 'qs';
import { Op } from 'sequelize';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOkResponse({ type: [ArticleDto] })
  findAll(@Req() request): any {
    const parsedQuery: any = qs.parse(request.url.split('?')[1]);
    const { limit, offset, where } = parsedQuery;

    console.log(`[articles]:  findAll`, limit, offset, where);
    return this.articlesService.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      where: where,
    });
  }

  @Get('/mine')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [ArticleDto] })
  findMine(@Req() request): any {
    const parsedQuery: any = qs.parse(request.url.split('?')[1]);
    const { limit, offset, where } = parsedQuery;

    console.log(`[articles]:  findMine`, limit, offset, where, request.user.id);
    return this.articlesService.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      where: Object.assign(
        {},
        {
          user_id: request.user.id,
        },
      ),
    });
  }

  @Get('/search')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [ArticleDto] })
  searchAll(@Req() request): Promise<any> {
    const parsedQuery: any = qs.parse(request.url.split('?')[1]);

    const { limit, offset, where } = parsedQuery;
    const _where = {};
    if (where) {
      for (const [key, val] of Object.entries(where)) {
        val &&
          (_where[key] = {
            [Op.iLike]: `%${val}%`,
          });
      }
      parsedQuery.where = _where;
    }
    console.log(`[searchAll]: `, request.url, parsedQuery);
    return this.articlesService.searchAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      where: _where,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleDto })
  @ApiParam({ name: 'id', required: true })
  findOne(@Param('id', new ParseIntPipe()) id: number): Promise<ArticleDto> {
    return this.articlesService.findOne(id);
  }

  @Post('')
  @ApiCreatedResponse({ type: ArticleEntity })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createArticleDto: CreateArticleDto,
    @Req() request,
  ): Promise<ArticleEntity> {
    console.log(`[articles]: `, request.user, createArticleDto);
    return this.articlesService.create(request.user, createArticleDto);
  }

  @Put(':id')
  @ApiOkResponse({ type: ArticleEntity })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() request,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleEntity> {
    return this.articlesService.update(id, request.user.id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  delete(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() request,
  ): Promise<ArticleEntity> {
    return this.articlesService.delete(id, request.user.id);
  }
}
