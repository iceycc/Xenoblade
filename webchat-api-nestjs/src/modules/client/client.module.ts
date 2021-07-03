import { Module,HttpModule } from '@nestjs/common';
import { TagsModule } from './tags/tags.module';
import { ArticlesModule } from './articles/articles.module';
import { RecommentsModule } from './recomments/recomments.module';
import { DetailsModule } from './details/details.module';
import { CatesModule } from './cates/cates.module';
import { CategoryModule } from './category/category.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    TagsModule,
    ArticlesModule,
    RecommentsModule,
    DetailsModule,
    CatesModule,
    CategoryModule,
    SearchModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ClientModule {

}
