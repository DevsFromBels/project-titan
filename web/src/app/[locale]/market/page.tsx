"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export interface IMarket {
  content_id: string;
  content: string;
  name: string;
  link: string;
  user_id: string;
  price_for_show: number;
}

async function getData() {
  const res = await fetch("https://market-api.titanproject.top/getMarket");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: IMarket[] = await res.json();
  return data;
}

const Page = () => {
  const [data, setData] = useState<IMarket[]>([]);
  const [imageErrors, setImageErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data: IMarket[] = await getData();
      setData(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleImageError = (contentId: string) => {
    setImageErrors((prevErrors) => [...prevErrors, contentId]);
  };

  const formatPrice = (price: number) => {
    const formattedPrice = price.toFixed(7);
    return parseFloat(formattedPrice).toString();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 overflow-y-auto">
      {data.map((e) => (
        <React.Fragment key={e.content_id}>
          {!imageErrors.includes(e.content_id) && (
            <div className="w-full h-auto max-h-[430px] sm:max-w-[400px] sm:w-[250px] break-all flex flex-col gap-2 border rounded-xl p-2">
              <div className="w-full h-[200px]">
                <Image
                  className="w-full h-full object-cover rounded"
                  draggable={false}
                  alt="Image"
                  src={`https://market-api.titanproject.top${e.content}`}
                  width="300"
                  height="300"
                  onError={() => handleImageError(e.content_id)}
                />
              </div>
              <div className="flex flex-col gap-2 p-2">
                <h1 className="w-[200px] text-ellipsis overflow-hidden">
                  Название: 
                  <p>{e.name}</p>
                </h1>
                <p className="w-[200px] text-ellipsis overflow-hidden">
                  Цена за показ: 
                  <p>{formatPrice(e.price_for_show)}$</p>
                </p>
              </div>
              <Button asChild>
                <Link href="/">Подключить</Link>
              </Button>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Page;