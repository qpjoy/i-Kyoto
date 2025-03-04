import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersProviders } from './users.providers';
import { UsersService } from './users.service';

import { JwtStrategy } from './auth/jwt-strategy';
import { UserProfilesProviders } from '../user-profiles/user-profiles.providers';
// import { CodesProviders } from '../code/code.providers';
// import { CodeService } from '../code/code.service';
import { CodesProviders } from '../code/code.providers';
import { CodeModule } from '../code/code.module';
import { CodeService } from '../code/code.service';
import { DevicesProviders } from '../devices/devices.provider';

@Module({
  imports: [CodeModule],
  controllers: [UsersController],
  providers: [
    ...UsersProviders,
    UsersService,
    ...UserProfilesProviders,
    ...CodesProviders,
    CodeService,
    ...DevicesProviders,

    // ...CodesProviders,
    // ...FilesProviders,
    JwtStrategy,
  ],
  exports: [UsersService],
})
export class UsersModule {}
