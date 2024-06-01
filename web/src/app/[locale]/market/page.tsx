import React, { use } from "react";
import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import getMarketAPI from "@/features/api/market-api";
import ImageBackgroundDetector from "@/shared/components/maleculas/ImageWithShadow";

const Page = () => {
  const marketPosts = use(getMarketAPI());

  const formatPrice = (price: number)  => {
    const formattedPrice = price.toFixed(7);
    return parseFloat(formattedPrice).toString();
  };

  if (!marketPosts) {
    return <h1>Рынок пока пуст</h1>;
  }

  return (
    <div className='w-[95%] mt-2 mx-auto'>
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pb-16">
      {marketPosts.map((e, index) => ( 
        <Link
          href={`/market/${e.content_id}`}
          key={index}
          className="relative  max-w-[250px] h-[200px] cursor-pointer lg:hover:scale-[101%]"
        >
          <div className="w-full h-full relative">
            <Image
              src={`https://market-api.titanproject.top${e.content}`}
              alt=""
              fill
              draggable={false}
              sizes="250px"
              priority
              className="object-cover rounded-lg"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white rounded-b-lg">
            <p className="text-sm font-semibold truncate">{e.name}</p>
            <p className="text-sm truncate">{formatPrice(e.price_for_show)}$ за показ</p>
            <p className="text-xs">
              {e.current_shows} / {e.total_shows} показов
            </p>
          </div>
        </Link>
      ))}
    </div>
    </div>
  );
};

export default Page;
