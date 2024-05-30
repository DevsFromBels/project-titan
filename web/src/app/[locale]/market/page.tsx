"use client";
import React, { useEffect } from "react";
import marketStore from "@/features/store/market.store";
import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { observer } from "mobx-react-lite";

const Page = () => {
  const { getMarketPosts, marketPosts } = marketStore;

  useEffect(() => {
    getMarketPosts();
  }, []);

  const formatPrice = (price: number) => {
    const formattedPrice = price.toFixed(7);
    return parseFloat(formattedPrice).toString();
  };

  if (!marketPosts) {
    return <h1>Рынок пока пуст</h1>;
  }

  return marketPosts?.case({
    pending: () => <div>Loading...</div>,
    rejected: () => <div>Не удалось получить рынок</div>,
    fulfilled: (value) => (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 overflow-y-auto justify-center">
        {value.map((e) => (
          <React.Fragment key={e.content_id}>
            <div className="w-full h-auto max-h-[430px] sm:max-w-[400px] sm:w-full break-all flex flex-col gap-2 border rounded-xl p-1 justify-center">
              <div className="w-full h-[200px]">
                <img
                  className="w-full h-full object-cover rounded"
                  draggable={false}
                  alt="Image"
                  src={`https://market-api.titanproject.top${e.content}`}
                  // layout="responsive"
                  width={300}
                  height={300}
                />
              </div>
              <div className="flex flex-col gap-2 p-2">
                <h1 className="w-full break-normal text-ellipsis overflow-hidden mb-5">
                  <p>{e.name}</p>
                </h1>
                <p className="w-full text-ellipsis overflow-hidden mb-5">
                  Цена за показ:
                  <p>{formatPrice(e.price_for_show)}$</p>
                </p>
              </div>
              <Button asChild>
                <Link href="/">Подключить</Link>
              </Button>
            </div>
          </React.Fragment>
        ))}
      </div>
    ),
  });
};

export default observer(Page);
