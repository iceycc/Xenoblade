import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT || 9123;

// const PREFIX = process.env.PREFIX || '/';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 给请求添加prefix
  // app.setGlobalPrefix(PREFIX);
  await app.listen(PORT, () => {
    Logger.log(`http://localhost:${PORT}`);
  });
}

bootstrap();
