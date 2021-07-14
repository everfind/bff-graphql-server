import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: '商品信息' })
export class GoodsData {
  @Field(() => String, { nullable: false, description: '商品 ID' })
  goodsId: string;

  @Field(() => String, { nullable: false, description: '商品名称' })
  goodsName: string;

  @Field(() => String, { nullable: true, description: '商品简介' })
  goodsBrief?: string;
}

@InputType({ description: '商品详情参数' })
export class GoodsParam {
  @Field(() => String, { nullable: false, description: '商品 ID' })
  goodsId: string;
}

@ObjectType({ description: '商品列表数据' })
export class GoodsListData {
  @Field(() => [GoodsData], { nullable: false, description: '订单列表数据' })
  list: GoodsData[];

  @Field(() => Int, { nullable: false, description: '总数' })
  totalCount: number;

  @Field(() => Int, { nullable: false, description: '当前页' })
  page: number;
}

@InputType({ description: '商品列表参数' })
export class GoodsListParam {
  @Field(() => String, { nullable: true, description: '商品名称' })
  goodsName?: string;

  @Field(() => Int, { nullable: true, description: '每页个数' })
  pageSize?: number;

  @Field(() => Int, { nullable: true, description: '第几页' })
  pageNum?: number;
}
