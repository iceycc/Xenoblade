import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { WxModule } from './modules/wx/wx.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [
    WxModule,
    ClientModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
