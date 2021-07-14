import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import {
  OrderData,
  OrderListData,
  OrderListParam,
} from 'src/models/orders/model';

@Injectable()
export class OrderService {
  constructor(private readonly http: HttpService) {}

  getOrderList(param: OrderListParam): Promise<OrderListData> {
    return this.http
      .get<OrderListData>('/orderservice/rest/order/list', { params: param })
      .toPromise()
      .then((resp) => {
        return resp.data;
      });
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
    return this.http
      .get<OrderData[]>('/orderservice/rest/order/list-by-id', {
        params: orderNoList,
      })
      .toPromise()
      .then((resp) => {
        return resp.data;
      });
  }

  getOrderByOrderNo(orderNo: string): Promise<OrderData> {
    return this.orderLoader.load(orderNo);
  }

  getOrderByOrderNoList(orderNoList: string[]): Promise<(OrderData | Error)[]> {
    return this.orderLoader.loadMany(orderNoList);
  }
}
