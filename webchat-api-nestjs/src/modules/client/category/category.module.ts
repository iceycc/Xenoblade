import { Module, HttpModule } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports:[
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers:[CategoryController],
  providers:[CategoryService]
})
export class CategoryModule{

}
