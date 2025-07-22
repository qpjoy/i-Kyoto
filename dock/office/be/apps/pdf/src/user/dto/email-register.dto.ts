import { Expose } from 'class-transformer';
import { IsString, MinLength, IsEmail } from 'class-validator';

export class EmailRegisterDto {
  @IsEmail()
  @Expose()
  // @MetaVerseResponse({
  //   searchable: true,
  //   readonly: false,
  // })
  readonly email: string;

  // @MetaVerseResponse({
  //   readonly: false,
  // })
  @IsString()
  @MinLength(6)
  @Expose()
  readonly password: string;

  @Expose()
  readonly code: string;

  @Expose()
  readonly deviceID?: string;
}
