import { Module, forwardRef } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@pdf/user/models/user.entity';
import { UserController } from '@pdf/user/user.controller';
import { CommonModule } from '@pdf/common/common.module';
import { UserService } from '@pdf/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@pdf/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // forwardRef(() => UserModule),
    // UserModule,
    CommonModule,
    // JwtModule.register({
    //   secretOrPrivateKey: 'secret123',
    //   signOptions: { expiresIn: '1d' },
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
