import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Postgres unique violation code
    if ((exception as any).code === '23505') {
      const detail = (exception as any).detail;
      const match = detail.match(/\((.*?)\)=\((.*?)\)/);
      const field = match?.[1] ?? 'field';
      const value = match?.[2] ?? 'value';

      return response.status(409).json({
        statusCode: 409,
        message: `${field} "${value}" already exists.`,
        error: 'Conflict',
      });
    }

    if ((exception as any).code === '23503') {
      // Foreign key violation
      return response.status(400).json({
        statusCode: 400,
        message: 'Invalid foreign key reference.',
        error: 'Bad Request',
      });
    }

    if ((exception as any).code === '23502') {
      // Not null violation
      const column = (exception as any).column || 'A required field';
      return response.status(400).json({
        statusCode: 400,
        message: `${column} must not be null.`,
        error: 'Bad Request',
      });
    }

    if ((exception as any).code === '22001') {
      return response.status(400).json({
        statusCode: 400,
        message: 'Input is too long for the field.',
        error: 'Bad Request',
      });
    }

    if ((exception as any).code === '23514') {
      return response.status(400).json({
        statusCode: 400,
        message: 'Check constraint violated.',
        error: 'Bad Request',
      });
    }

    // fallback
    return response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
