import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './models/file.entity';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { AuthModule } from '@pdf/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity]), AuthModule],
  providers: [FileService],
  controllers: [FileController],
  exports: [FileService],
})
export class FileModule {}
