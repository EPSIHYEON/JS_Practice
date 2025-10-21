// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5137'],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT);

  const connection = app.get<Connection>(getConnectionToken());
  console.log(
    `MongoDB connected: ${connection.host}:${connection.port}/${connection.name}`,
  );
}
bootstrap();
