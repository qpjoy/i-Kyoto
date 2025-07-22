// import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './create-user.dto';

// export class UpdateUserDto extends PartialType(CreateUserDto) {}

import {
  IsString,
  IsEmail,
  IsEnum,
  IsISO8601,
  IsOptional,
  MinLength,
} from 'class-validator';
import { Gender } from '../../../shared/enum/gender';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MetaVerseResponse } from 'src/utils/decorators/metaVerseResponse';

export class UpdateUserDto {
  @MetaVerseResponse({
    readonly: true,
    hidden: true,
  })
  @Expose()
  readonly uuid: string;
  @ApiProperty()
  @IsEmail()
  @Expose()
  @MetaVerseResponse({
    searchable: true,
  })
  readonly email: string;

  @MetaVerseResponse({
    readonly: true,
  })
  @ApiProperty()
  @IsString()
  @MinLength(6)
  @Expose()
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Expose()
  @MetaVerseResponse({
    searchable: true,
  })
  readonly nickName: string;

  @ApiProperty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @Expose()
  readonly lastName: string;

  @MetaVerseResponse({
    searchable: true,
    readonly: true,
  })
  @ApiProperty()
  @IsOptional()
  @IsEnum(Gender)
  @Expose()
  readonly gender: Gender;

  @ApiProperty()
  @IsOptional()
  @IsISO8601()
  @Expose()
  readonly birthday: string;
}
