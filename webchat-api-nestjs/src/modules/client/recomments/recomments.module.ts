import { Module } from '@nestjs/common';
import { RecommentsController } from './recomments.controller';
import { RecommentsService } from './recomments.service';
import { ArticlesModule } from '../articles/articles.module';

@Module({
  imports:[ArticlesModule],
  controllers:[RecommentsController],
  providers:[RecommentsService]
})
export class RecommentsModule{

}
