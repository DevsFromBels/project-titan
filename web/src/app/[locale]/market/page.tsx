"use client";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import getMarketAPI, { IGetMarket } from "@/features/api/market-api";
import { Store } from "lucide-react";

const Page = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [marketPosts, setMarketPosts] = useState<IGetMarket | null>();
  const loadMoreRef = useRef(null);

  const formatPrice = (price: number) => {
    const formattedPrice = Math.ceil(price).toFixed(2);
    return formattedPrice.toString();
  };

  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true); // установка состояния загрузки в true
      const newData = await getMarketAPI(page);
      setMarketPosts((prevData) => ({ ...prevData, ...newData }));
      setIsLoading(false); // установка состояния загрузки в false после завершения загрузки данных
    };
    fetchData();
  }, [page]);

  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (isLoading) {
    return (
      <div className="relative h-full w-full flex flex-col gap-2 items-center justify-center">
        <Store className="w-[50px] h-[50px]" />
        <h1>Рынок загружаеться</h1>
      </div>
    );
  }

  if (!marketPosts?.items) {
    return (
      <div className="relative h-full w-full flex flex-col gap-2 items-center justify-center">
        <Store className="w-[50px] h-[50px]" />
        <h1>Товаров на рынке не найдено</h1>
      </div>
    );
  }

  return (
    <div className="w-[95%] mt-2 mx-auto">
      <div
        className="grid p-2 gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pb-16"
        ref={loadMoreRef}
      >
        {marketPosts.items.map((post, index) => (
          <Link
            href={`/market/${post.content_id}`}
            key={index}
            className="relative max-w-[250px] h-[200px] cursor-pointer lg:hover:scale-[101%]"
          >
            <div className="w-full h-full relative">
              <Image
                src={`https://market-api.titanproject.top${post.content}`}
                alt=""
                fill
                draggable={false}
                sizes="250px"
                // priority
                className="object-cover rounded-lg"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white rounded-b-lg">
              <p className="text-sm font-semibold truncate">{post.name}</p>
              <p className="text-sm truncate">
                {formatPrice(post.price_for_show)} BYR за показ
              </p>
              <p className="text-xs">
                {post.current_shows} / {post.total_shows} показов
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
