import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { Gender } from '../../../shared/enum/gender';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsString, IsDate } from 'class-validator';
import { MetaVerseResponse } from 'src/utils/decorators/metaVerseResponse';

export class UserDto {
  @ApiProperty()
  @Expose()
  @MetaVerseResponse({
    readonly: true,
    searchable: true,
  })
  id: number;

  @ApiProperty()
  @Expose()
  @MetaVerseResponse({
    readonly: true,
    searchable: true,
  })
  uuid: string;

  @ApiProperty()
  @Expose()
  @MetaVerseResponse({
    readonly: true,
    searchable: true,
  })
  readonly email: string;

  @ApiProperty()
  @Expose()
  @MetaVerseResponse({
    searchable: true,
  })
  readonly userName: string;

  @ApiProperty()
  @Expose()
  @MetaVerseResponse({
    searchable: false,
  })
  readonly nickName: string;

  @ApiProperty()
  @Expose()
  @MetaVerseResponse({
    searchable: true,
  })
  readonly firstName: string;

  @ApiProperty()
  @Expose()
  @MetaVerseResponse({
    searchable: true,
  })
  readonly lastName: string;

  @ApiProperty()
  @Expose()
  @MetaVerseResponse({
    searchable: true,
  })
  readonly gender: Gender;

  @ApiProperty()
  @IsDate()
  @Expose()
  readonly birthday: string;

  @ApiProperty()
  @Expose()
  @MetaVerseResponse({
    searchable: true,
  })
  readonly hobbies: object;

  @ApiProperty()
  @Expose()
  @MetaVerseResponse({
    searchable: false,
  })
  readonly records: number;

  @ApiProperty()
  @Expose()
  @MetaVerseResponse({
    searchable: false,
  })
  readonly words: number;

  @ApiProperty()
  @Expose()
  @MetaVerseResponse({
    searchable: false,
  })
  readonly likes: number;

  @ApiProperty()
  @Expose()
  @MetaVerseResponse({
    readonly: true,
  })
  readonly createdAt: Date;

  constructor(user: User) {
    this.id = user?.id;
    this.uuid = user?.uuid;
    this.email = user?.email;
    this.userName = user?.userName;
    this.nickName = user?.nickName;
    this.firstName = user?.firstName;
    this.lastName = user?.lastName;
    this.gender = user?.gender;
    this.birthday = user?.birthday;
    this.hobbies = user?.hobbies;
    this.createdAt = user?.createdAt;
  }

  // @Exclude()
  // private user: User;
  // constructor(user: User) {
  //   Object.assign(this, user);
  //   Object.assign(
  //     this,
  //     pickProperties(user, [
  //       'id',
  //       'uuid',
  //       'email',
  //       'userName',
  //       'nickName',
  //       'firstName',
  //       'lastName',
  //       'gender',
  //       'birthday',
  //       'hobbies',
  //       'createdAt',
  //     ]),
  //   );
  // }
}
