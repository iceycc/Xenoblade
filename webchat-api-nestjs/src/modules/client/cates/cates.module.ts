import { Module, HttpModule } from '@nestjs/common';
import { CatesController } from './cates.controller';
import { CatesService } from './cates.service';

@Module({
  imports:[HttpModule.register({})],
  controllers:[CatesController],
  providers:[CatesService]
})
export class CatesModule{

}
