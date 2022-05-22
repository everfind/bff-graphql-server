import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
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
    return this.goodsService.getGoods(param);
  }
}

@Resolver(() => GoodsData)
export class GoodsPropertyResolver {
  @ResolveField(() => String, {
    name: 'goodsBrief',
    nullable: false,
  })
  goodsBrief(@Parent() goodsData: GoodsData): string {
    return `${goodsData.goodsBrief}---测试后缀`;
  }
}
