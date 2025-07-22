import { NestFactory } from '@nestjs/core';
import { PdfModule } from './pdf.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { TypeOrmExceptionFilter } from './core/filters/typeorm-exception.filter';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';
import { AllExceptionsFilter } from './core/filters/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(PdfModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const port = 9101;
  app.setGlobalPrefix('api');

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  // app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.use(cookieParser());
  app.enableCors({
    origin: (origin, callback) => {
      const allowlist = [
        'http://localhost:5173',
        'http://www.memoscard.com',
        'http://43.246.210.144',
        'http://pdf.memoscard.com',
        'https://pdf.memoscard.com/',
      ];
      if (!origin || allowlist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });
  Logger.log('Nest application unsuccessfully started');
  Logger.verbose('123');
  Logger.debug('345');
  Logger.warn('567');
  Logger.error('789');
  Logger.log(
    'hello',
    {
      hello: 'world',
    },
    {
      hello: 'world1',
    },
  );

  await app.listen(process.env.port ?? port, '0.0.0.0');
}
bootstrap();
