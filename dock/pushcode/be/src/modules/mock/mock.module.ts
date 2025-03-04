import { Module } from '@nestjs/common';
import { MockService } from './mock.service';
import { MockController } from './mock.controller';
import { UsersProviders } from '../users/users.providers';

@Module({
  controllers: [MockController],
  providers: [MockService, ...UsersProviders],
})
export class MockModule {}
