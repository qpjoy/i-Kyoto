import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FilesProviders } from './files.provider';
import { UsersModule } from '../users/users.module';
// import { UsersService } from '../users/users.service';
// import { MowModule } from '../mow.module';
// import { UsersProviders } from '../users/users.providers';
// import { UsersService } from '../users/users.service';

@Module({
  imports: [UsersModule],
  controllers: [FilesController],
  providers: [FilesService, ...FilesProviders],
  exports: [FilesService],
})
export class FilesModule {}
