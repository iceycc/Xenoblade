import { Injectable, HttpService } from '@nestjs/common';
import { details } from '../mock/details';
import { map } from 'rxjs/operators';

@Injectable()
export class DetailsService {
  constructor(
    private readonly _HttpServer: HttpService,
  ) {
  }

  getList(query) {
    const { number, path } = query;
    const url = `https://gitee.com/api/v5/repos/${process.env.GITEE_OWNER}/${path}/issues/${number}?access_token=${process.env.GITEE_ACCESS_TOKEN}`;
    return this._HttpServer.get(url).pipe(map(response => {
      return {
        data: response.data,
      };
    }));
  }
}
