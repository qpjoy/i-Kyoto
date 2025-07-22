import { Module, forwardRef } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@pdf/user/models/user.entity';
import { UserService } from '@pdf/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Permission } from '@pdf/permission/models/permission.entity';
import { Role } from '@pdf/role/models/role.entity';
import { PermissionService } from '@pdf/permission/permission.service';
import { RoleService } from '@pdf/role/role.service';
import { PermissionGuard } from '@pdf/permission/permission.guard';
import { AuthGuard } from './auth.guard';
import { UserModule } from '@pdf/user/user.module';
import { CodeModule } from '@pdf/code/code.module';
import { jwtSecret } from '@pdf/utils/variables';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Permission, Role]),
    forwardRef(() => UserModule),
    forwardRef(() => CodeModule),

    // UserModule,
    // CommonModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    PermissionService,
    RoleService,
    PermissionGuard,
  ],
  exports: [
    AuthService,
    PermissionGuard,
    PermissionService,
    RoleService,
    JwtModule,
  ],
})
export class AuthModule {}
