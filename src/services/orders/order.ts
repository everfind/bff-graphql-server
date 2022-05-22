import { HttpService, Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { ORDER_LIST } from 'mock/order.mock';
import {
  OrderData,
  OrderListData,
  OrderListParam,
  OrderParam,
} from 'src/models/orders/model';

@Injectable()
export class OrderService {
  constructor(private readonly http: HttpService) {}

  getOrder(param: OrderParam): Promise<OrderData> {
    return this.getOrderByOrderNo(param.orderNo);
  }

  getOrderList(param: OrderListParam): Promise<OrderListData> {
    return Promise.resolve(ORDER_LIST);
    // return this.http
    //   .get<OrderListData>('/orderservice/rest/order/list', { params: param })
    //   .toPromise()
    //   .then((resp) => {
    //     return resp.data;
    //   });
  }

  private orderLoader = new DataLoader<string, OrderData>(
    async (orderNoList: readonly string[]) => {
      const orderList = await this.batchGetOrderByOrderNo(
        orderNoList as string[],
      );
      return orderNoList.map((orderNo) =>
        orderList.find((order) => order.orderNo === orderNo),
      );
    },
  );

  private batchGetOrderByOrderNo(orderNoList: string[]): Promise<OrderData[]> {
    return Promise.resolve(ORDER_LIST).then(
      (orderListData) => orderListData.list,
    );
    // return this.http
    //   .get<OrderData[]>('/orderservice/rest/order/list-by-id', {
    //     params: orderNoList,
    //   })
    //   .toPromise()
    //   .then((resp) => {
    //     return resp.data;
    //   });
  }

  getOrderByOrderNo(orderNo: string): Promise<OrderData> {
    return this.orderLoader.load(orderNo);
  }

  getOrderByOrderNoList(orderNoList: string[]): Promise<(OrderData | Error)[]> {
    return this.orderLoader.loadMany(orderNoList);
  }
}
