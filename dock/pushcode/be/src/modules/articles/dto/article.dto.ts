import { ApiProperty } from '@nestjs/swagger';
import { Article } from '../entities/article.entity';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsString, IsDate } from 'class-validator';
import { MetaVerseResponse } from '../../../utils/decorators/metaVerseResponse';

export class ArticleDto {
  @Expose()
  @MetaVerseResponse({
    readonly: true,
    hidden: true,
  })
  @ApiProperty()
  readonly id: number;

  @Expose()
  @ApiProperty()
  @MetaVerseResponse({
    readonly: true,
    // hidden: true,
    // component: 'user',
    as: 'articleIda',
  })
  readonly userId: string;

  // @ApiProperty()
  // readonly authorFirstName: string;

  // @ApiProperty()
  // readonly authorLastName: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly content: string;

  @ApiProperty()
  readonly desc: string;

  @ApiProperty()
  readonly brief: string;

  @ApiProperty()
  @MetaVerseResponse({
    // readonly: true,
    hidden: false,
    // component: 'user',
    // as: 'articleIda',
  })
  readonly ledePic: string;

  @ApiProperty()
  readonly thumbnails: object;

  @ApiProperty()
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(article: Article) {
    this.id = article?.id;
    // this.authorId = article?.userId;
    // this.authorFirstName = article?.user.firstName;
    // this.authorLastName = article?.user.lastName;
    this.title = article?.title;
    this.content = article?.content;
    this.desc = article?.desc;
    this.brief = article?.brief;
    this.ledePic = article?.ledePic;
    this.thumbnails = article?.thumbnails;
    this.createdAt = article?.createdAt;
    this.updatedAt = article?.updatedAt;
  }
}
