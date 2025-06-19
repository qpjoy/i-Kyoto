import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    try {
      const jwt = request.cookies['jwt'];
      console.log(`[jwt in authGuard]: `, jwt);
      const res = this.jwtService.verify(jwt, {
        secret: 'secret123',
      });
      console.log(`[res]: `, res);
      return res;
    } catch (e) {
      return false;
    }
  }
}
