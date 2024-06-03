import { MarketPostArray } from '@/shared/types/market.types'
import { Scan } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { use } from 'react'

interface ISimilarProducts {
  post_id: string;
}

export interface IGetSimilarProducts {
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

async function getSimilarProducts(post_id: string): Promise<IGetSimilarProducts> {
  const res: IGetSimilarProducts = await fetch(`https://market-api.titanproject.top/get-similar-products?content_id=${post_id}&page=1&limit=20`, {
    method: "GET",
    next: {
      revalidate: 3500
    }
  }).then((res) => res.json())

  return res;
} 

const SimilarProducts = ({post_id}: ISimilarProducts) => {
  const similarProducts = use(getSimilarProducts(post_id))

  console.log(!similarProducts.items)

  if(similarProducts.items.length <= 0) {
    return <div className='relative h-[250px] flex flex-col gap-2 items-center justify-center'>
      <Scan className='w-[50px] h-[50px]'/>
      <h1>Похожих товаров не найдено</h1>
    </div>
  }

  return (
    <div className='w-full p-2'>
    <h1 className='text-lg py-2'>Похожие товары</h1>
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pb-16">
      {similarProducts.items.map((e, index) => (
        <Link href={`/market/${e.content_id}`} key={index} className="relative max-w-[250px] h-[200px] cursor-pointer lg:hover:scale-[101%]">
          <div className="w-full h-full relative">
            <Image
              src={`https://market-api.titanproject.top${e.content}`}
              alt=""
              fill
              draggable={false}
              priority
              className="object-cover rounded-lg"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white rounded-b-lg">
            <p className="text-sm font-semibold truncate">{e.name}</p>
            <p className="text-xs">{e.current_shows} / {e.total_shows} показов</p>
          </div>
        </Link>
      ))}
    </div>
    </div>
  )
}

export default SimilarProducts