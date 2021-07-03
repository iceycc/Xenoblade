import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { RecommentsService } from './recomments.service';
import { TransformInterceptor } from '../../../interceptor/transform.interceptor';

@Controller('api/client/recomments')
@UseInterceptors(TransformInterceptor)
export class RecommentsController {
  constructor(
    private readonly server: RecommentsService,
  ) {
  }

  @Get()
  getList(
    @Query() query: any,
  ) {
    return this.server.getList(query);
  }
}
