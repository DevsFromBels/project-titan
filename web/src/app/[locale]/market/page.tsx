"use client";
import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    const fetchData = async () => {
      const data: IMarket[] = await getData();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-2 p-5">
      {data.map((e) => (
        <div
          key={e.content_id}
          className="w-full h-[300px] flex flex-col gap-2 border rounded-xl p-2"
        >
          <div className="w-full h-[400px] p-2">
            <Image
              className="w-[450px] h-[150px] object-cover rounded"
              alt="Image"
              src={`https://market-api.titanproject.top${e.content}`}
              width="300"
              height="300"
            />
          </div>
          <div className="flex justify-between p-2">
            <h1 className='w-[200px] text-ellipsis overflow-hidden'>Название: {e.name}</h1>
            <p>Цена за показ: {e.price_for_show}$</p>
          </div>

          <Button asChild>
            <Link href="/">Подключить</Link>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Page;
