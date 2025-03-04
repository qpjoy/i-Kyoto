import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Length, IsString, IsOptional } from 'class-validator';
import { MetaVerseResponse } from '../../../utils/decorators';

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  @Length(3, 60)
  @MetaVerseResponse({
    readonly: false,
    searchable: false,
  })
  @Expose()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @Expose()
  readonly content: string;

  @MetaVerseResponse({
    readonly: false,
    component: 'select',
    hidden: true,
  })
  @Expose()
  userId: string;

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
