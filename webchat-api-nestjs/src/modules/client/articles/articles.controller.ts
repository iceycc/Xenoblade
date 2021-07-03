import { Controller, Get, UseInterceptors, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { TransformInterceptor } from '../../../interceptor/transform.interceptor';

@Controller('api/client/articles')
@UseInterceptors(TransformInterceptor)
export class ArticlesController {
  constructor(
    private readonly server: ArticlesService,
  ) {
  }

  @Get()
  getTags(
    @Query() query: { path: string, page: number, per_page:number },
  ) {
    console.log('tags/list');
    return this.server.getList(query);
  }
}
