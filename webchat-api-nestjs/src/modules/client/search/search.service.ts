import { Injectable } from '@nestjs/common';
import {articles} from '../mock/tags'
@Injectable()
export class SearchService{
  getTags(){
    return articles
  }
}
