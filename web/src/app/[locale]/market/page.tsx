"use client"
import React, { useState, useEffect, useRef, useLayoutEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import getMarketAPI, { IGetMarket, Item } from "@/features/api/market-api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { ArrowDownToLine, ArrowUpToLine, Store } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

const Page = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  const [marketPosts, setMarketPosts] = useState<IGetMarket | null>();
  const loadMoreRef = useRef(null);

  const formatPrice = (price: number) => {
    const formattedPrice = Math.ceil(price).toFixed(2);
    return formattedPrice.toString();
  };

  useEffect(() => {
    const fetchData = async () => {
      const newData = await getMarketAPI(page);
      setMarketPosts((prevData) => ({ ...prevData, ...newData }));
      setIsLoading(false);
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

  const filteredAndSortedPosts = useMemo(() => {
    if (!marketPosts?.items) {
      return [];
    }
  
    let filteredPosts = marketPosts.items;
  
    if (category && category !== "none") { 
      filteredPosts = filteredPosts.filter((post: Item) => post.category === category);
    }
  
    if (sortOrder !== "none") {
      filteredPosts.sort((a: Item, b: Item) => {
        if (sortOrder === "asc") {
          return a.price_for_show - b.price_for_show;
        } else {
          return b.price_for_show - a.price_for_show;
        }
      });
    }
  
    return filteredPosts;
  }, [marketPosts, category, sortOrder]);
  

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
    <div className="w-[95%] mb-4 mx-auto">
      <div className="h-[50px] m-auto p-2 flex items-center gap-2 border-b-[1px]">
        <Select onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className="w-[200px] h-[35px]">
            <SelectValue placeholder="Категория" />
          </SelectTrigger>
          <SelectContent className="w-[200px] z-20">
            <SelectItem value="none">Категория</SelectItem>
            <SelectItem value="Веб-Сайт">Веб-Сайт</SelectItem>
            <SelectItem value="Социальная сеть (telegram)">
              Социальная сеть (telegram)
            </SelectItem>
            <SelectItem value="Социальная сеть (youtube)">
              Социальная сеть (youtube)
            </SelectItem>
            <SelectItem value="Социальная сеть (whatsapp)">
              Социальная сеть (whatsapp)
            </SelectItem>
            <SelectItem value="Социальная сеть (instagram)">
              Социальная сеть (instagram)
            </SelectItem>
            <SelectItem value="Социальная сеть (twitter)">
              Социальная сеть (twitter)
            </SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex justify-center items-center p-2"
            onClick={() => setSortOrder("asc")}
          >
            <ArrowDownToLine width={20} height={20} />
          </Button>
          <Button
            variant="outline"
            className="flex justify-center items-center p-2"
            onClick={() => setSortOrder("desc")}
          >
            <ArrowUpToLine width={20} height={20} />
          </Button>
        </div>
      </div>

      <div
        className="grid p-2 gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pb-16"
        ref={loadMoreRef}
      >
        {filteredAndSortedPosts.map((post, index) => (
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
                className="object-cover rounded-lg"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white rounded-b-lg">
              <p className="text-sm font-semibold truncate">{post.name}</p>
              <p className="text-sm truncate">
                {formatPrice(post.price_for_show)} BYN за показ
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
