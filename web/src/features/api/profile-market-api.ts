import Cookies from "js-cookie";

export type UserMarketArray = UserMarketAPI[];

export interface UserMarketAPI {
  content_id: string;
  content: string;
  name: string;
  link: string;
  user_id: string;
  price_for_show: number;
  total_shows: number;
  current_shows: number;
  category: string | null;
}

async function getUserMarketAPI(user_id: string) {
  const res: UserMarketArray = await fetch(
    `https://market-api.titanproject.top/get-all-user-market-products?user_id=${user_id}`,
    {
      cache: "no-cache",
      next: {
        revalidate: 1500,
      },
      method: "GET",
    }
  ).then((res) => res.json());

  return res;
}

export { getUserMarketAPI };
