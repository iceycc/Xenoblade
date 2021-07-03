import { Injectable } from '@nestjs/common';
import {recomments} from '../mock/tags'
import { ArticlesService } from '../articles/articles.service';
@Injectable()
export class RecommentsService{
  constructor(
    private readonly ArticlesService:ArticlesService
  ){}
  getList(query){
    return this.ArticlesService.getList(query)
  }
}
