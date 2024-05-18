import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { IoAdapter } from '@nestjs/platform-socket.io';


async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);

  // Настройка CORS для WebSocket
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors({
    origin: 'http://localhost:5173', // Разрешенный источник
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Разрешенные методы
    credentials: true, // Включить передачу учетных данных
  });

  await app.listen(4005);
}
bootstrap();
