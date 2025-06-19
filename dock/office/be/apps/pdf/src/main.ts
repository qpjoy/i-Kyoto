import { NestFactory } from '@nestjs/core';
import { PdfModule } from './pdf.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(PdfModule);
  const port = 3000;
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: `http://localhost:${port}`,
    credentials: true,
  });
  await app.listen(process.env.port ?? port);
}
bootstrap();
