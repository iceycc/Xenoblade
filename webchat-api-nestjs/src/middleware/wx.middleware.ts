import { Injectable, NestMiddleware } from '@nestjs/common';
@Injectable()
export class WxMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): void {
    // console.log('中间价');
    next();
  }
}
