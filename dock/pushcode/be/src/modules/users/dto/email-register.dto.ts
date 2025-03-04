import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, MinLength, IsEmail } from 'class-validator';

import { MetaVerseResponse } from 'src/utils/decorators/metaVerseResponse';

export class EmailRegisterDto {
  @ApiProperty()
  @IsEmail()
  @Expose()
  @MetaVerseResponse({
    searchable: true,
    readonly: false,
  })
  readonly email: string;

  @MetaVerseResponse({
    readonly: false,
  })
  @ApiProperty()
  @IsString()
  @MinLength(6)
  @Expose()
  readonly password: string;

  @Expose()
  readonly code: string;

  @Expose()
  readonly deviceID?: string;
}
