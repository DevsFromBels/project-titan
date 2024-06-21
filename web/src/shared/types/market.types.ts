export type MarketPostArray = MarketPost[]

export interface MarketPost {
  content_id: string
  content: string
  name: string
  link: string
  user_id: string
  price_for_show: number
  total_shows: number
  current_shows: number
  category: string
}
