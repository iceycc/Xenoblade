import { Controller, Get, UseInterceptors, Query } from '@nestjs/common';
import { CatesService } from './cates.service';
import { TransformInterceptor } from '../../../interceptor/transform.interceptor';

@Controller('api/client/cates')
@UseInterceptors(TransformInterceptor)
export class CatesController {
  constructor(
    private readonly server: CatesService,
  ) {
  }

  @Get()
  getList(
    @Query() query:{path:string}
  ) {
    console.log('tags/list');
    return this.server.getList(query);
  }
}
