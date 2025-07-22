import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_TYPE_KEY, AccessType } from './auth.decorator';
import { jwtKey, jwtSecret } from '@pdf/utils/variables';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const jwt = request.cookies[jwtKey];
    if (!jwt) throw new UnauthorizedException('Missing JWT');

    let user;
    try {
      user = this.jwtService.verify(jwt, { secret: jwtSecret });
    } catch {
      throw new UnauthorizedException('Invalid JWT');
    }

    request.user = user;

    const accessType: AccessType =
      this.reflector.get<AccessType>(ACCESS_TYPE_KEY, context.getHandler()) ||
      'any';

    switch (accessType) {
      case 'any':
        return true;
      case 'self': {
        const targetId =
          request.body?.id || request.params?.id || request.query?.id;

        if (user.id + '' !== targetId + '') {
          throw new ForbiddenException('Self-access only');
        }
        return true;
      }
      case 'admin':
        if (user.role !== 'admin') {
          throw new ForbiddenException('Admin access only');
        }
        return true;
      default:
        throw new ForbiddenException('Invalid access type');
    }
  }
}
