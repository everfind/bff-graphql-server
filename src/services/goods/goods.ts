import { HttpService, Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import {
  GoodsData,
  GoodsListData,
  GoodsListParam,
  GoodsParam,
} from 'src/models/goods/model';

@Injectable()
export class GoodsService {
  constructor(private readonly http: HttpService) {}

  getGoods(param: GoodsParam): Promise<GoodsData> {
    return Promise.resolve({
      goodsId: 'g-0001',
      goodsName: '商品名称',
      goodsBrief: '这里有一段商品简介',
    });
    // return this.http
    //   .get<GoodsData>('/goodsservice/rest/goods/detail', { params: param })
    //   .toPromise()
    //   .then((resp) => resp.data);
  }

  getGoodsList(param: GoodsListParam): Promise<GoodsListData> {
    return this.http
      .get<GoodsListData>('/goodsservice/rest/goods/list', { params: param })
      .toPromise()
      .then((resp) => resp.data);
  }

  private goodsLoader = new DataLoader<string, GoodsData>(
    async (goodsIdList: readonly string[]) => {
      const goodsList = await this.batchGetGoodsByGoodsId(
        goodsIdList as string[],
      );
      return goodsIdList.map((goodsId) =>
        goodsList.find((goodsData) => goodsData.goodsId === goodsId),
      );
    },
  );

  private batchGetGoodsByGoodsId(goodsIdList: string[]): Promise<GoodsData[]> {
    return this.http
      .get<GoodsData[]>('/goodsservice/rest/goods/list-by-id', {
        params: goodsIdList,
      })
      .toPromise()
      .then((resp) => {
        return resp.data;
      });
  }

  getGoodsById(goodsId: string): Promise<GoodsData> {
    // return this.goodsLoader.load(goodsId);
    return Promise.resolve({
      goodsId: 'g-0001',
      goodsName: '商品名称',
      goodsBrief: '这里有一段商品简介',
    });
  }

  getGoodsByIdList(goodsIdList: string[]): Promise<(GoodsData | Error)[]> {
    return this.goodsLoader.loadMany(goodsIdList);
  }
}
