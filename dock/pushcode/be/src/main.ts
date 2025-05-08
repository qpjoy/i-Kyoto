import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import { contentParser } from 'fastify-multer';

import { setupSwagger } from './swagger';

import { ABSOLUTE_PUBLIC_PATH, PUBLIC_PATH } from './utils/appRoot';
import { RedisIoAdapter } from './modules/socketio/adapters/redis-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  app.setGlobalPrefix('v2', { exclude: ['cats'] });
  app.enableCors();

  app.register(contentParser as any);
  app.useStaticAssets({
    root: ABSOLUTE_PUBLIC_PATH,
    prefix: PUBLIC_PATH,
    index: 'index.html',
  });

  // socketio & redis
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  // push-code like push => 9056
  await app.listen(9056, '0.0.0.0');
  console.log(
    `[Bootstrap complete]: Application is running on... ${await app.getUrl()}`,
  );
}
bootstrap();
