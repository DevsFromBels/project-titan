import { MarketPostArray } from "@/shared/types/market.types";

export default async function getMarketAPI() {
  const res: MarketPostArray = await fetch(
    "https://market-api.titanproject.top/getMarket"
  ).then((res) => res.json());

  return res;
}
