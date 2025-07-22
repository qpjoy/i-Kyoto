import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
// import { RoleModule } from './role/role.module';
// import { PermissionModule } from './permission/permission.module';
// import { ProductModule } from './product/product.module';
import { APP_GUARD } from '@nestjs/core';
import { PermissionGuard } from './permission/permission.guard';
import ormConfig from './core/config/orm.config';
import { OrderModule } from './order/order.module';
import { CodeModule } from './code/code.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      // {
      //   ormConfig(),
      //   // autoLoadEntities: true,
      //   // synchronize: true,
      // },
      ormConfig(),
    ),
    AuthModule,
    UserModule,
    CodeModule,
    OrderModule,
    FileModule,
  ],
  controllers: [PdfController],
  providers: [
    PdfService,
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class PdfModule {}
