import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Length, IsString, IsOptional } from 'class-validator';
import { MetaVerseResponse } from '../../../utils/decorators';

export class CreateFileDto {
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
  @MetaVerseResponse({
    readonly: true,
  })
  @ApiProperty()
  user_id: number;

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
}
