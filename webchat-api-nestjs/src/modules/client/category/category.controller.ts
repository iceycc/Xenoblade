import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TransformInterceptor } from '../../../interceptor/transform.interceptor';

@Controller('api/client/category')
@UseInterceptors(TransformInterceptor)
export class CategoryController {
  constructor(
    private readonly server: CategoryService,
  ) {
  }

  @Get()
  getList() {
    return this.server.getList();
  }
}
