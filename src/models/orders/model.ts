import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: '订单数据' })
export class OrderData {
  @Field(() => String, { nullable: false, description: '订单号' })
  orderNo: string;

  @Field(() => String, { nullable: false, description: '商品 ID' })
  goodsId: string;

  @Field(() => Float, { nullable: false, description: '金额' })
  pay: number;

  @Field(() => String, { nullable: true, description: '备注信息' })
  comment?: string;
}

@InputType({ description: '订单详情参数' })
export class OrderParam {
  @Field(() => String, { nullable: false, description: '订单号' })
  orderNo: string;
}

@ObjectType({ description: '订单列表' })
export class OrderListData {
  @Field(() => [OrderData], { nullable: false, description: '订单列表数据' })
  list: OrderData[];

  @Field(() => Int, { nullable: false, description: '总数' })
  totalCount: number;

  @Field(() => Int, { nullable: false, description: '当前页' })
  page: number;
}

@InputType({ description: '订单列表参数' })
export class OrderListParam {
  @Field(() => String, { nullable: true, description: '订单号' })
  orderNo?: string;

  @Field(() => Int, { nullable: true, description: '每页个数' })
  pageSize?: number;

  @Field(() => Int, { nullable: true, description: '第几页' })
  pageNum?: number;
}
