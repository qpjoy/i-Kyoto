import { Module, Global } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';

import { ElasticsearchController } from './elasticsearch.controller';
import { AiModule } from '../ai/ai.module';

@Global() // Use @Global to make this module available globally
@Module({
  imports: [AiModule],
  controllers: [ElasticsearchController],
  providers: [ElasticsearchService],
  exports: [ElasticsearchService], // Export the service for use in other modules
})
export class ElasticsearchModule {}
