import { IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  // @IsNotEmpty()
  first_name?: string;
  // @IsNotEmpty()
  last_name?: string;
  @IsNotEmpty()
  email: string;
  role_id?: number;
}
