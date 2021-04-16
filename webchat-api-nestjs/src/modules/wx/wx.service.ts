import { HttpService, Injectable } from '@nestjs/common';
import * as sha1 from 'sha1';
import * as convert from 'xml-js';
import { AccessToken, AccessTokenApi } from 'tnwx';

@Injectable()
export class WxService {
  get httpService(): HttpService {
    return this._httpService;
  }

  constructor(
    private readonly _httpService: HttpService,
  ) {
  }

  initWxToken(query): any {
    console.log(query);
    const token = process.env.WX_TOKEN;
    if (!query.signature) return 'hello, this is handle view';
    const { signature, timestamp, nonce, echostr } = query;
    const arr = [token, timestamp, nonce].sort().join('');
    const result = sha1(arr);
    if (result === signature) {
      return echostr;
    } else {
      return '';
    }
  }

  async getWxToken(query): Promise<any> {
    console.log(query);
    const data = await AccessTokenApi.getAccessToken();
    return <AccessToken>data;
  }
}
