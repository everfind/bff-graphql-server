import { OrderData, OrderListData } from 'src/models/orders/model';

const orderList: OrderData[] = [
  {
    orderNo: 'o-001',
    goodsId: 'g-001',
    pay: 100,
    payNum: 100,
    comment: '订单001',
  },
  {
    orderNo: 'o-002',
    goodsId: 'g-002',
    pay: 200,
    payNum: 200,
    comment: '订单002',
  },
];

export const ORDER_LIST: OrderListData = {
  list: orderList,
  totalCount: orderList.length,
  page: 1,
};
