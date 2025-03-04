import { Module } from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';
import { UserProfilesController } from './user-profiles.controller';
import { UserProfilesProviders } from './user-profiles.providers';

@Module({
  controllers: [UserProfilesController],
  providers: [UserProfilesService, ...UserProfilesProviders],
})
export class UserProfilesModule {}
