import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.entity';
import { UploadController } from '@pdf/upload/upload.controller';
import { AuthModule } from '@pdf/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],
  controllers: [ProductController, UploadController],
  providers: [ProductService],
})
export class ProductModule {}
