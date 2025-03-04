import { Module } from '@nestjs/common';
import { HelpsService } from './helps.service';
import { HelpsController } from './helps.controller';
import { HelpsProviders } from './helps.providers';

@Module({
  controllers: [HelpsController],
  providers: [...HelpsProviders, HelpsService],
  exports: [HelpsService],
})
export class HelpsModule {}
