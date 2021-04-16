import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): void {
    console.log('logger 中间价', req.url);
    console.log('logger 中间价', req.baseUrl);
    console.log('logger 中间价', req.method);
    // console.log(res);
    next();
  }
}
