import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiConfig, ApiConfigKit } from 'tnwx';

@Injectable()
export class WxinitGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const devApiConfig = new ApiConfig(process.env.WX_APPID, process.env.WX_APP_SECRET, process.env.WX_TOKEN, false);

    // 微信公众号、微信小程序、微信小游戏 支持多应用
    ApiConfigKit.putApiConfig(devApiConfig);
    // 开启开发模式,方便调试
    ApiConfigKit.devMode = true;
    // 设置当前应用
    ApiConfigKit.setCurrentAppId(devApiConfig.getAppId);
    return true;
  }
}
