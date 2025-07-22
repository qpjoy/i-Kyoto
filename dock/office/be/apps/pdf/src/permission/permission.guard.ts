import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from '@pdf/auth/auth.service';
import { Role } from '@pdf/role/models/role.entity';
import { RoleService } from '@pdf/role/role.service';
import { User } from '@pdf/user/models/user.entity';
import { UserService } from '@pdf/user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const access = this.reflector.get<string>('access', context.getHandler());
    if (!access) {
      return true;
    }
    if (access === 'guests') {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    let user: User | null;
    try {
      const id = await this.authService.userId(request);
      user = await this.userService.findOne({ id }, ['role']);
    } catch (err) {
      // user is not logged in
      // user = null;
      return false;
    }

    // const permissions = user?.role?.permissions?.map((p) => p.name) ?? [];
    if (!user?.role) {
      return false;
    }

    // ✅ If admin, allow all
    if (user.role.name === 'admin') {
      return true;
    }

    const role: Role = await this.roleService.findOne({ id: user.role.id }, [
      'permissions',
    ]);

    const permissions = role?.permissions?.map((p) => p.name) ?? [];

    // If user has full access (e.g., "users"), grant all
    if (permissions.includes(access)) {
      return true;
    }
    const method = request.method;
    // Define permission mapping by HTTP method
    const permissionMap: Record<string, string[]> = {
      GET: [`view_${access}`, `add_${access}`, `del_${access}`],
      POST: [`add_${access}`],
      PUT: [`edit_${access}`],
      PATCH: [`edit_${access}`],
      DELETE: [`del_${access}`],
    };

    const requiredPerms = permissionMap[method] ?? [];

    return requiredPerms.some((perm) => permissions.includes(perm));
  }
}
