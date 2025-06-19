import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'pdf',
      // schema: 'pdf',
      // entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),

    UserModule,
  ],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
