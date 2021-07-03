import { Module, HttpModule } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports:[HttpModule.register({})],
  controllers:[TagsController],
  providers:[TagsService]
})
export class TagsModule{

}
