import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { CodesProviders } from './code.providers';
import { UsersProviders } from '../users/users.providers';
import { DevicesProviders } from '../devices/devices.provider';

@Module({
  controllers: [CodeController],
  providers: [
    CodeService,
    ...CodesProviders,
    ...UsersProviders,
    ...DevicesProviders,
  ],
  // exports: [CodeService],
})
export class CodeModule {}
