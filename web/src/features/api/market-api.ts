import { MarketPostArray } from "@/shared/types/market.types";

export interface IGetMarket {
  items: Item[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface Item {
  content_id: string
  content: string
  name: string
  link: string
  user_id: string
  price_for_show: number
  total_shows: number
  current_shows: number
  category: any
}

export default async function getMarketAPI(page: number): Promise<IGetMarket> {
  const res: IGetMarket = await fetch(
    `https://market-api.titanproject.top/getMarket?page=${page}&limit=30`,
    {
      cache: 'no-cache'
    }
  ).then((res) => res.json());

  return res;
}
