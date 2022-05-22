import { GoodsData, GoodsListData } from 'src/models/goods/model';

const goodsList: GoodsData[] = [
  {
    goodsId: 'g-001',
    goodsName: '测试商品001',
    goodsBrief: '这是测试商品001',
  },
  {
    goodsId: 'g-002',
    goodsName: '测试商品002',
    goodsBrief: '这是测试商品002',
  },
];

export const GOODS_LIST: GoodsListData = {
  list: goodsList,
  totalCount: goodsList.length,
  page: 1,
};
