import { Injectable, HttpService, UseInterceptors } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { category } from '../mock/category';

@Injectable()
export class CategoryService {
  constructor(
    private readonly _HttpService: HttpService,
  ) {
  }

  getList(query = { page: 1, per_page: 20 }) {
    const { page, per_page } = query;
    // return category
    return this._HttpService.get(`https://gitee.com/api/v5/orgs/${process.env.GITEE_OWNER}/repos?access_token=${process.env.GITEE_ACCESS_TOKEN}&type=public&page=${page}&per_page=${per_page}`)
      .pipe(map(response => {
        return {
          data: response.data.map(item => {
            return {
              name: item.name,
              cate_id: item.id,
              path: item.path,
              tags: [],
              list: [],
              current: 0,
              isInitTag: false,
              loadStatus: 'loadmore',
              'cursor': '0',
            };
          }),
        };
      }));
    // return this._HttpService.get('https://gitee.com/api/v5/orgs/programmer-promotion/repos?type=public&page=1&per_page=20')
    //   .pipe(
    //     map(response => {
    //      return {
    //        'err_no': 0,
    //        'err_msg': 'success',
    //        data:response.data.map(item => {
    //          return {
    //            name: item.name,
    //            cate_id: item.id,
    //            path:item.path,
    //            tags: [],
    //            list: [],
    //            current: 0,
    //            isInitTag: false,
    //            loadStatus: 'loadmore',
    //            'cursor': '0',
    //          };
    //        })
    //      }
    //     }),
    //   );
  }
}
