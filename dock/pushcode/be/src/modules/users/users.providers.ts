import { User } from './entities/user.entity';

export const UsersProviders = [
  {
    provide: 'UsersRepository',
    useValue: User,
  },
];
