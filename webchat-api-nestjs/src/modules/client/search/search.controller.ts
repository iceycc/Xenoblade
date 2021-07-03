import { Controller, Get } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('api/client/search')
export class SearchController {
  constructor(
    private readonly server: SearchService,
  ) {
  }

  @Get()
  getTags() {
    console.log('tags/list');
    return this.server.getTags();
  }
}
