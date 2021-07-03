import { Controller, Get, Query } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('api/client/tags')
export class TagsController {
  constructor(
    private readonly server: TagsService,
  ) {
  }

  @Get()
  getList(
    @Query() query: { path: string },
  ) {
    console.log('tags/list');
    return this.server.getList(query);
  }
}
