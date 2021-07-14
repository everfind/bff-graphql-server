import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  GoodsData,
  GoodsListData,
  GoodsListParam,
  GoodsParam,
} from 'src/models/goods/model';
import { GoodsService } from 'src/services/goods/goods';

@Resolver()
export class GoodsResolver {
  constructor(private readonly goodsService: GoodsService) {}

  @Query(() => GoodsListData, {
    name: 'goodsListData',
  })
  goodsList(@Args('param') param: GoodsListParam): Promise<GoodsListData> {
    return this.goodsService.getGoodsList(param);
  }

  @Query(() => GoodsData, {
    name: 'goodsData',
  })
  goods(@Args('param') param: GoodsParam): Promise<GoodsData> {
    return this.goodsService.getGoodsById(param.goodsId);
  }
}
