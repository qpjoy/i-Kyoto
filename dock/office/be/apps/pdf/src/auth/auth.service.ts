import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtKey, jwtSecret } from '@pdf/utils/variables';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async userId(request: Request): Promise<number> {
    const cookie = request.cookies[jwtKey];

    const data = await this.jwtService.verifyAsync(cookie, {
      secret: jwtSecret,
    });

    return data['id'];
  }
}
