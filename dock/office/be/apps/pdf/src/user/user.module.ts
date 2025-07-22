import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import { AuthModule } from '@pdf/auth/auth.module';
import { CodeModule } from '@pdf/code/code.module';

// import { CodesProviders } from '@pdf/code/code.providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => CodeModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
