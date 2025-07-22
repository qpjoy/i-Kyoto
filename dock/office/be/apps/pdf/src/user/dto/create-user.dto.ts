// import {
//   IsString,
//   IsEmail,
//   IsEnum,
//   IsISO8601,
//   IsOptional,
//   MinLength,
// } from 'class-validator';
// import { Gender } from '../../../shared/enum/gender';
// import { ApiProperty } from '@nestjs/swagger';
// import { Expose } from 'class-transformer';
// import { MetaVerseResponse } from 'src/utils/decorators/metaVerseResponse';

// export class CreateUserDto {
//   @MetaVerseResponse({
//     readonly: true,
//     hidden: true,
//   })
//   @Expose()
//   readonly userId: string;

//   @ApiProperty()
//   @IsEmail()
//   @Expose()
//   @MetaVerseResponse({
//     searchable: true,
//     readonly: false,
//   })
//   readonly email: string;

//   @MetaVerseResponse({
//     readonly: false,
//   })
//   @ApiProperty()
//   @IsString()
//   @MinLength(6)
//   @Expose()
//   readonly password: string;

//   @ApiProperty()
//   @IsOptional()
//   @IsString()
//   @Expose()
//   @MetaVerseResponse({
//     searchable: true,
//   })
//   readonly name: string;

//   @ApiProperty()
//   @IsOptional()
//   @IsString()
//   @Expose()
//   @MetaVerseResponse({
//     searchable: true,
//   })
//   readonly nickName: string;

//   @ApiProperty()
//   @IsOptional()
//   @IsString()
//   readonly firstName: string;

//   @ApiProperty()
//   @IsOptional()
//   @IsString()
//   @Expose()
//   readonly lastName: string;

//   @MetaVerseResponse({
//     searchable: true,
//     readonly: false,
//   })
//   @ApiProperty()
//   @IsOptional()
//   @IsEnum(Gender)
//   @Expose()
//   readonly gender: Gender;

//   @ApiProperty()
//   @IsOptional()
//   @IsISO8601()
//   @Expose()
//   readonly birthday: string;
// }
