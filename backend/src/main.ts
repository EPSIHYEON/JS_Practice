import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Nest 애플리케이션 인스턴스 생성
  const app = await NestFactory.create(AppModule);
  // 프론트엔드(Vite 5173)에서의 요청을 허용하도록 CORS 설정
  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5137'], // 허용할 Origin 목록
    credentials: true, // 쿠키/인증 헤더 사용 시 true로
  });
  // DTO 기반 요청 검증 활성화 (허용되지 않은 필드 자동 제거)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // PORT 환경변수가 있으면 해당 값 사용, 없으면 3000번 포트 사용
  const PORT = process.env.PORT ?? 3000;

  await app.listen(PORT);

  console.log('NestJS server is running on http://localhost:${PORT}');
}

bootstrap();
