import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((originalData) => {
        const statusCode = response.statusCode || 200;

        // Extract msg or fallback to 'OK'
        const msg =
          (originalData && originalData.msg) ||
          (statusCode === 201 ? 'Created' : 'OK');

        // Extract data/meta if wrapped manually
        const data = originalData?.data ?? originalData;
        const meta = originalData?.meta ?? {};

        return {
          code: 0,
          msg,
          data,
          meta,
        };
      }),
    );
  }
}
