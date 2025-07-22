import { UserDto } from './user.dto';
// import { ApiProperty } from '@nestjs/swagger';
import { User } from '../models/user.entity';

class UserRes extends UserDto {
  constructor(user: User) {
    super(user);
  }
}

export class UserLoginResponseDto {
  // @ApiProperty()
  token?: string;

  // @ApiProperty()
  user: UserRes;

  constructor(user: User, token?: string) {
    this.token = token;
    this.user = new UserRes(user);
  }
}
