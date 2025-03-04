// import { PartialType } from '@nestjs/mapped-types';
// import { CreateArticleDto } from './create-article.dto';

// export class UpdateArticleDto extends PartialType(CreateArticleDto) {}

import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Length, IsString, IsOptional } from 'class-validator';
import { MetaVerseResponse } from '../../../utils/decorators';

export class UpdateArticleDto {
  @ApiProperty()
  @IsString()
  @Length(3, 60)
  @MetaVerseResponse({
    readonly: true,
    required: false,
    hidden: false,
  })
  @Expose()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @Expose()
  readonly content: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Expose()
  readonly desc: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Expose()
  readonly brief: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Exclude()
  readonly ledePic: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Expose()
  readonly thumbnails: object;
}
