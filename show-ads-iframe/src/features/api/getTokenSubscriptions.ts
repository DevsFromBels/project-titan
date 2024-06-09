export type Subscriptions = Subscription[]

export interface Subscription {
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

export default async function getTokenSubscriptions(token: string): Promise<Subscriptions | string> {
  const res = await fetch(`https://market-api.titanproject.top/get-user-subscriptions?token=${token}`, {
    method: "GET",
  });

  if(!res.ok) {
    return "Token not found"
  }

  const data: Subscriptions = await res.json()
  return data;
}
