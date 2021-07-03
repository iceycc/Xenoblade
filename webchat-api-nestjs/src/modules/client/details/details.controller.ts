import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { DetailsService } from './details.service';
import { TransformInterceptor } from '../../../interceptor/transform.interceptor';

@Controller('api/client/details')
@UseInterceptors(TransformInterceptor)
export class DetailsController {
  constructor(
    private readonly server: DetailsService,
  ) {
  }

  @Get()
  getList(
    @Query() query:{number:string}
  ) {
    return this.server.getList(query);
  }
}
