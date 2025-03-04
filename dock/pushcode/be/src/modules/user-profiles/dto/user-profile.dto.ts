import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { MetaVerseResponse } from 'src/utils/decorators';
import { UserProfile } from '../entities/user-profile.entity';

export class UserProfileDto extends UserDto {
  //   @ApiProperty()
  //   @Expose()
  //   @MetaVerseResponse({
  //     readonly: true,
  //     searchable: true,
  //   })
  //   id: number;

  //   @ApiProperty()
  //   @Expose()
  //   @MetaVerseResponse({
  //     readonly: true,
  //     searchable: true,
  //   })
  //   userId: number;

  //   @ApiProperty()
  //   @Expose()
  //   @MetaVerseResponse({
  //     readonly: true,
  //     searchable: true,
  //   })
  //   avatar: string;

  //   @ApiProperty()
  //   @Expose()
  //   @MetaVerseResponse({
  //     readonly: true,
  //     searchable: true,
  //   })
  //   company: string;

  //   @ApiProperty()
  //   @Expose()
  //   @MetaVerseResponse({
  //     readonly: true,
  //     searchable: true,
  //   })
  //   address: string;

  //   @ApiProperty()
  //   @Expose()
  //   @MetaVerseResponse({
  //     readonly: true,
  //     searchable: true,
  //   })
  //   education: string;

  //   @ApiProperty()
  //   @Expose()
  //   @MetaVerseResponse({
  //     readonly: true,
  //     searchable: true,
  //   })
  //   title: string;
  @ApiProperty()
  @Expose()
  @MetaVerseResponse({
    readonly: true,
    searchable: true,
  })
  userProfile: Partial<UserProfile> = {};

  constructor(user: User) {
    super(user);
    this.userProfile.id = user?.userProfile?.id;
    this.userProfile.userId = user?.userProfile?.userId;
    this.userProfile.avatar = user?.userProfile?.avatar;
    this.userProfile.company = user?.userProfile?.company;

    this.userProfile.address = user?.userProfile?.address;
    this.userProfile.education = user?.userProfile?.education;
    this.userProfile.title = user?.userProfile?.title;
    this.userProfile.mood = user?.userProfile?.mood;
    this.userProfile.records = user?.userProfile?.records;
    this.userProfile.words = user?.userProfile?.words;
    this.userProfile.likes = user?.userProfile?.likes;
  }
}
