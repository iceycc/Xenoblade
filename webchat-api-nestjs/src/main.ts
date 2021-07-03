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
 return app
}

// 注意: 通过注入 NODE_ENV 为 local，来方便本地启动服务，进行开发调试
const isLocal = process.env.NODE_ENV === 'local'
if (isLocal) {
  bootstrap().then((app) => {
    app.listen(PORT, () => {
      console.log(`Server start on http://localhost:${PORT}`)
    })
  })
}
// 导出启动函数，给 sls.js 使用
export { bootstrap }
