import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { AiProviders } from './ai.providers';

@Module({
  controllers: [AiController],
  providers: [AiService, ...AiProviders],
  exports: [AiService],
})
export class AiModule {}
