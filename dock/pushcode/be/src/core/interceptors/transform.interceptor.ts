import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseMessageKey } from '../decorators/response.decorator';

export interface Response<T> {
  data: T;
}

export interface ResponseCode {
  data: object;
  code: number;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    const responseMessage =
      this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ??
      '';

    const statusCode = context.switchToHttp().getResponse().statusCode;
    return next.handle().pipe(
      map((data: any) => {
        if (data)
          return data.code || data.code === 0
            ? {
                code: data.code,
                data: data.data,
                statusCode,
                message: data.message || responseMessage,
              }
            : {
                code: statusCode === 200 || statusCode === 201 ? 0 : -1,
                data,
                statusCode,
                message: responseMessage,
              };
      }),
    );
  }
}
