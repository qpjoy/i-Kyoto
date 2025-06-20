import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import { CommonModule } from '@pdf/common/common.module';
import { AuthModule } from '@pdf/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommonModule, AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
