import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

export const ACCESS_TYPE_KEY = 'access_type';

export type AccessType = 'any' | 'self' | 'admin';

export const Auth = (type: AccessType = 'any') => {
  return applyDecorators(
    SetMetadata(ACCESS_TYPE_KEY, type),
    UseGuards(AuthGuard),
  );
};
