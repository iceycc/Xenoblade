import { Module, HttpModule } from '@nestjs/common';
import { DetailsController } from './details.controller';
import { DetailsService } from './details.service';

@Module({
  imports:[HttpModule.register({})],
  controllers:[DetailsController],
  providers:[DetailsService]
})
export class DetailsModule{

}
