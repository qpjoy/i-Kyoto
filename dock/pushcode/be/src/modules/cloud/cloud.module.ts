import { Module } from '@nestjs/common';
import { CloudService } from './cloud.service';
import { CloudController } from './cloud.controller';
import { CloudProviders } from './cloud.providers';
import { FilesProviders } from '../files/files.provider';
import { FilesService } from '../files/files.service';
// import { ExaminationService } from '../examination/examination.service';

@Module({
  controllers: [CloudController],
  providers: [
    ...CloudProviders,
    CloudService,
    ...FilesProviders,
    FilesService,
    // ExaminationService,
  ],
})
export class CloudModule {}
