import { Module, HttpModule, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { WxController } from './wx.controller';
import { WxService } from './wx.service';
import { WxMiddleware } from '../../middleware/wx.middleware';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  })],
  controllers: [WxController],
  providers: [WxService],
})
export class WxModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // consumer
    //   .apply(WxMiddleware)
    //   .forRoutes({
    //     path: '/getAccessToken',
    //     method: RequestMethod.GET,
    //   });
  }
}
