import { Module, forwardRef } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { Code } from './models/code.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@pdf/user/models/user.entity';
import { UserModule } from '@pdf/user/user.module';
import { AuthModule } from '@pdf/auth/auth.module';
// import { CodesProviders } from './code.providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([Code, User]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [CodeController],
  providers: [CodeService],
  exports: [CodeService],
})
export class CodeModule {}
