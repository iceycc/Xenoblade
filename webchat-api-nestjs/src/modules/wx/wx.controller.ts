import { Controller, Get, Query, Post, Body, Req, Res, UseGuards, HttpService } from '@nestjs/common';
import { Request, Response } from 'express';
import { WxService } from './wx.service';
import { ObjectType } from 'src/types/common';
import { ApiConfigKit, WeChat, ICache } from 'tnwx';
import { MsgController } from 'src/utils/messageAdapter';
import { WxinitGuard } from 'src/guard/wxinit.guard';

@Controller()
export class WxController {
  constructor(
    private readonly server: WxService,
    private readonly _httpService: HttpService,
  ) {
  }

  @Get('/msg')
  @UseGuards(WxinitGuard)
  getMsg(@Query() query: ObjectType, @Res() res: Response) {
    console.log(query);
    // const appId: string = query.appId as string;
    // if (appId) {
    //   ApiConfigKit.setCurrentAppId(appId);
    // }
    // const signature: string = query.signature,//微信加密签名
    //   timestamp = query.timestamp,//时间戳
    //   nonce = query.nonce,//随机数
    //   echostr = query.echostr;//随机字符串
    // WeChat.checkSignature(signature, timestamp, nonce, echostr);
    res.send('1111');
  }

  @Get('/getAccessToken')
  @UseGuards(WxinitGuard)
  getToken(
    @Query() query: ObjectType,
  ) {
    return this.server.getWxToken(query);
  }

  @Get('/wx')
  get(
    @Query() query: ObjectType,
  ) {
    return this.server.initWxToken(query);
  }

  @Post('/wx')
  @UseGuards(WxinitGuard)
  PostMsg(@Req() req: Request, @Res() res: Response) {
    // 支持多公众号
    console.log(req.query);
    const appId: any = req.query.appId || '';
    if (appId) {
      ApiConfigKit.setCurrentAppId(appId as string);
    }
    // 获取签名相关的参数用于消息解密(测试号以及明文模式无此参数)
    const msgSignature = req.query.msg_signature,
      timestamp = req.query.timestamp,
      nonce = req.query.nonce;

    //监听 data 事件 用于接收数据
    const buffer: Uint8Array[] = [];
    req.on('data', function(data: any) {
      buffer.push(data);
    });

    req.on('end', async function() {
      const msgXml = Buffer.concat(buffer).toString('utf-8');
      // 处理消息并响应对应的回复
      console.log(msgXml);
      // ...
      const data =await WeChat.handleMsg(new MsgController(), msgXml, msgSignature as string, timestamp as string, nonce as string);

      res.send(data);
    });

    req.on('error', function(error) {
      console.log('error', error);
    });
  }

  @Get('/ip')
  @UseGuards(WxinitGuard)
  async getIp(
    @Query('access_token') access_token: string,
  ) {
    const res = await this._httpService.get('https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token=' + access_token);
    console.log(res);
    return res;
  }
}

