import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DevicesProviders } from './devices.provider';
import { UsersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';
import { UserProfilesProviders } from '../user-profiles/user-profiles.providers';
import { ConfigService } from 'src/shared/config/config.service';
import { CodesProviders } from '../code/code.providers';
import { CodeService } from '../code/code.service';

@Module({
  imports: [DevicesModule],
  controllers: [DevicesController],
  providers: [
    ...DevicesProviders,
    DevicesService,
    ...UsersProviders,
    ...UserProfilesProviders,
    ConfigService,
    ...CodesProviders,
    CodeService,
    UsersService,
  ],
  exports: [DevicesService],
})
export class DevicesModule {}
