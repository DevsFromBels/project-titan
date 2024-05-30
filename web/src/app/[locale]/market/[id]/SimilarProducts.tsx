import { MarketPostArray } from '@/shared/types/market.types'
import Image from 'next/image';
import Link from 'next/link';
import React, { use } from 'react'

interface ISimilarProducts {
  post_id: string;
}

async function getSimilarProducts(post_id: string): Promise<MarketPostArray> {
  const res: MarketPostArray = await fetch(`https://market-api.titanproject.top/get-similar-products?content_id=${post_id}`, {
    method: "GET",
    next: {
      revalidate: 3500
    }
  }).then((res) => res.json())

  return res;
} 

const SimilarProducts = ({post_id}: ISimilarProducts) => {
  const similarProducts = use(getSimilarProducts(post_id))

  if(!similarProducts) {
    return <div className='h-screen w-screen flex items-center justify-center'>
      <h1>Похожих товаров не найдено</h1>
    </div>
  }

  return (
    <div className='w-full p-2'>
    <h1 className='text-lg py-2'>Похожие товары</h1>
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pb-16">
      {similarProducts.map((e, index) => (
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