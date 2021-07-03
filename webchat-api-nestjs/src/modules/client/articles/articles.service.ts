// import { Injectable } from '@nestjs/common';
// import {articles} from '../mock/tags'
// @Injectable()
// export class ArticlesService{
//
//   // https://gitee.com/api/v5/repos/programmer-promotion/blog/issues?access_token=c289aea9f9c5835d3129bc30587d9a05&state=open&sort=created&direction=desc&page=1&per_page=20
//   getTags(){
//     return articles
//   }
// }


import { HttpService, Injectable } from '@nestjs/common';
import { articles } from '../mock/tags';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly _HttpServer: HttpService,
  ) {
  }

  getList(query) {
    const { path, page = 1, per_page = 20, state = 'closed', labels = '' } = query;
    if (path == 'hot') {
      return {
        data: [],
      };
    } else {
      let url = `https://gitee.com/api/v5/repos/${process.env.GITEE_OWNER}/${path}/issues?access_token=${process.env.GITEE_ACCESS_TOKEN}&state=${state}&sort=created&direction=desc&page=${page}&per_page=${per_page}`;
      if (labels) {
        url += ('&labels=' + labels);
      }
      console.log(url);
      return this._HttpServer.get(url)
        .pipe(map(response => {
          return {
            data: response.data,
          };
        }));
    }

  }
}




