import { Injectable, Inject } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';
import { fileMapper } from 'src/utils/fileMapper';
import { User } from '../users/entities/user.entity';
import { generateMetaVerse } from 'src/utils/metaVerseGenerator';
import { FileDto } from './dto/file.dto';

@Injectable()
export class FilesService {
  constructor(
    @Inject('FilesRepository')
    private filesRepository: typeof File,
  ) {}

  async uploadSingleFile(options: any) {
    const { req, body, file } = options;
    console.log(`[upload single file]: `, file);
    const mappedFile = fileMapper({
      file,
      req,
    });

    console.log(`[mappedFile]: `, mappedFile);

    return await this.create({
      name: file.originalname,
      hashed_name: file.filename,
      size: file.size,
      content_type: file.mimetype,
      url: mappedFile.file_url,
      mode: 'local',
    });
  }

  async create(createFileDto: Partial<CreateFileDto>) {
    const file = new File();
    file.name = createFileDto.name;
    file.hashed_name = createFileDto.hashed_name;
    file.size = createFileDto.size;
    file.content_type = createFileDto.content_type;
    file.url = createFileDto.url;
    file.mode = createFileDto.mode;
    file.userId = createFileDto.user_id;
    return file.save();
  }

  async ocrFile(createFileDto: Partial<CreateFileDto>) {
    const file = new File();
    file.name = createFileDto.name;
    file.hashed_name = createFileDto.hashed_name;
    file.size = createFileDto.size;
    file.content_type = createFileDto.content_type;
    file.content = createFileDto.content;
    file.url = createFileDto.url;
    file.mode = createFileDto.mode;
    file.userId = createFileDto.user_id;
    return file.save();
  }

  async findOneByUrl(url: string) {
    const result = await this.filesRepository.findOne({
      where: {
        url,
      },
      attributes: [
        'id',
        'uuid',
        'name',
        'userId',
        'url',
        'content',
        'content_type',
        'mode',
        'createdAt',
      ],
    });
    return result;
  }

  async findOneById(id: string) {
    const result = await this.filesRepository.findOne({
      where: {
        id,
      },
      attributes: [
        'id',
        'uuid',
        'name',
        'userId',
        'url',
        'properties',
        'content',
        'content_type',
        'mode',
        'createdAt',
      ],
    });
    return result;
  }

  async findMine(condition: any = { limit: 10, offset: 0 }) {
    const files = await this.filesRepository.findAndCountAll<File>({
      ...condition,
      order: [['created_at', 'DESC']],
    });

    const { count, rows } = files;
    return {
      count,
      rows: rows?.length ? rows.map((file) => new FileDto(file)) : [],
    };
  }

  async findAndCountAll(condition = { limit: 10, offset: 0 }) {
    const files = await this.filesRepository.findAndCountAll<File>({
      ...condition,
      order: [['created_at', 'DESC']],
    });

    const { count, rows } = files;
    const { limit, offset } = condition;
    return {
      count,
      limit,
      offset,
      rows: rows.map((file) => new FileDto(file)),
    };
  }

  async searchAll(condition: any = { limit: 10, offset: 0 }) {
    const files = await this.filesRepository.findAndCountAll<File>({
      ...condition,
      order: [['created_at', 'DESC']],
    });
    const metaVerse = generateMetaVerse({
      model: User,
      createDtoClass: CreateFileDto,
      updateDtoClass: UpdateFileDto,
      dtoClass: FileDto,
    });
    const { count, rows } = files;
    return {
      count,
      rows: rows?.length ? rows.map((file) => new FileDto(file)) : [],
      metaVerse,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: any) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return this.filesRepository.destroy({
      where: {
        id,
      },
    });
  }
}
