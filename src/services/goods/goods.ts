import { HttpService, Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { GOODS_LIST } from 'mock/goods.mock';
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
    return this.getGoodsById(param.goodsId);
  }

  getGoodsList(param: GoodsListParam): Promise<GoodsListData> {
    return Promise.resolve(GOODS_LIST);
    // return this.http
    //   .get<GoodsListData>('/goodsservice/rest/goods/list', { params: param })
    //   .toPromise()
    //   .then((resp) => resp.data);
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
    return Promise.resolve(GOODS_LIST).then(
      (goodsListData) => goodsListData.list,
    );
    // return this.http
    //   .get<GoodsData[]>('/goodsservice/rest/goods/list-by-id', {
    //     params: goodsIdList,
    //   })
    //   .toPromise()
    //   .then((resp) => {
    //     return resp.data;
    //   });
  }

  getGoodsById(goodsId: string): Promise<GoodsData> {
    return this.goodsLoader.load(goodsId);
  }

  getGoodsByIdList(goodsIdList: string[]): Promise<(GoodsData | Error)[]> {
    return this.goodsLoader.loadMany(goodsIdList);
  }
}
