import { MarketPostArray } from "@/shared/types/market.types";
import { makeAutoObservable } from "mobx";
import { IPromiseBasedObservable, fromPromise } from "mobx-utils";
import getMarketAPI from "../api/market-api";

class MarketStore {
  marketPosts?: IPromiseBasedObservable<MarketPostArray>;

  constructor() {
    makeAutoObservable(this);
  }

  getMarketPosts = () => {
    this.marketPosts = fromPromise(getMarketAPI());
  };
}

export default new MarketStore();
