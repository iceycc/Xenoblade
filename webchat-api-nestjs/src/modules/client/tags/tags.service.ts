import { HttpService, Injectable } from '@nestjs/common';
import { tags } from '../mock/tags';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TagsService {
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
            return {
              'id': 2546527,
              'tag_id': '6809640408797167623',
              'tag_name': item.name,
              'color': `#${item.color}`,
              'url': item.url,
              'icon': '',
              'back_ground': '',
              'show_navi': 1,
              'id_type': 9,
              ...item,
            };
          }),
          'cursor': '30',
          'count': 638,
          'has_more': true,
        };
      }));
  }
}
