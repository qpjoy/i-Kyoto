import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  UseGuards,
  Injectable,
} from '@nestjs/common';
import { FilesService } from './files.service';
// import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { ABSOLUTE_PUBLIC_PATH } from 'src/utils/appRoot';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FastifyFileInterceptor } from 'src/core/interceptors/fastifyFile.interceptor';
import { diskStorage } from 'fastify-multer';
import { editFileName, imageFileFilter } from 'src/utils/fileUploadUtil';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import * as qs from 'qs';
import { Op } from 'sequelize';
import Collection from 'src/utils/commonLang/Collection';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly usersService: UsersService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @Post('/profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FastifyFileInterceptor('file', {
      storage: diskStorage({
        destination: ABSOLUTE_PUBLIC_PATH,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadSingleFile(@Req() req, @Body() body, @UploadedFile() file: any) {
    const profileUploadRes: any = await this.filesService.uploadSingleFile({
      req,
      body,
      file,
    });

    const userRes = await this.usersService.setMyUserProfile(req.user, {
      userProfile: {
        avatar: profileUploadRes.url,
      },
    });
    console.log(
      `[upload single file res]: setting profile => `,
      userRes,
      profileUploadRes,
    );

    return profileUploadRes;
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findMine(@Req() request): any {
    const parsedQuery = qs.parse(request.url.split('?')[1]);
    const { limit = 10, offset = 0, where = {} } = parsedQuery;
    const _where = {
      user_id: request.user.id,
      status: 'ocred',
    };
    console.log(`[Request]: `, request.user.id);

    if (!Collection.isEmpty(where)) {
      for (const [key, val] of Object.entries(where)) {
        val &&
          (_where[key] = {
            [Op.iLike]: `%${val}%`,
          });
      }
      parsedQuery.where = _where;
    }
    console.log(`[Files]: searchAll `, request.url, parsedQuery);
    return this.filesService.findMine({
      limit: Number(limit),
      offset: Number(offset),
      where: _where,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(`[File]: id ${id} ...`, typeof id);
    return this.filesService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }

  @Get('/search')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  // @ApiOkResponse( )
  searchAll(@Req() request): any {
    const parsedQuery = qs.parse(request.url.split('?')[1]);
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
    console.log(`[Files]: searchAll `, request.url, parsedQuery);
    return this.filesService.searchAll({
      limit: Number(limit),
      offset: Number(offset),
      where: _where,
    });
  }
}
