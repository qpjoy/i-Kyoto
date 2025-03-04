import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Length, IsString, IsOptional } from 'class-validator';
import { MetaVerseResponse } from '../../../utils/decorators';
import { File } from '../entities/file.entity';

export class FileDto {
  @Expose()
  @MetaVerseResponse({
    readonly: true,
    hidden: true,
  })
  @ApiProperty()
  id: number;

  @Expose()
  @MetaVerseResponse({
    readonly: true,
  })
  @ApiProperty()
  uuid: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  desc: string;

  @Expose()
  @ApiProperty()
  hashed_name: string;

  @Expose()
  @ApiProperty()
  original_name: string;

  @Expose()
  @ApiProperty()
  size: number;

  @Expose()
  @ApiProperty()
  content_type: string;

  @Expose()
  @ApiProperty()
  content: string;

  @Expose()
  @ApiProperty()
  url: string;

  // local or oss
  @Expose()
  @ApiProperty()
  mode: string;

  @Expose()
  @ApiProperty()
  status: string;

  @ApiProperty()
  properties: object;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  constructor(file: File) {
    this.id = file?.id;
    // this.authorId = file?.userId;
    // this.authorFirstName = file?.user.firstName;
    // this.authorLastName = file?.user.lastName;
    this.uuid = file?.uuid;
    this.name = file?.name;
    this.desc = file?.desc;
    this.hashed_name = file?.hashed_name;
    this.original_name = file?.original_name;
    this.size = file?.size;
    this.content_type = file?.content_type;
    this.url = file?.url;
    this.mode = file?.mode;
    this.status = file?.status;
    this.properties = file?.properties;
    this.createdAt = file?.createdAt;
  }
}
