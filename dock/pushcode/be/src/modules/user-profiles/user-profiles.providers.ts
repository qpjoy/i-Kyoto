import { UserProfile } from './entities/user-profile.entity';

export const UserProfilesProviders = [
  {
    provide: 'UserProfilesRepository',
    useValue: UserProfile,
  },
];
