import { Injectable, HttpService } from '@nestjs/common';
import { cates } from '../mock/cates';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CatesService {
  constructor(
    private readonly _HttpServer: HttpService,
  ) {
  }

  getList(query): Observable<any> {
    const { path } = query;
    // 获取仓库标签
    // https://gitee.com/api/v5/repos/{owner}/{repo}/labels
    return this._HttpServer.get(`https://gitee.com/api/v5/repos/${process.env.GITEE_OWNER}/${path}/labels?access_token=${process.env.GITEE_ACCESS_TOKEN}`)
      .pipe(map(response => {
        return {
          data: response.data.map(item => {
            return item;
          }),
          'cursor': '30',
          'count': 638,
          'has_more': true,
        };
      }));
  }
}
