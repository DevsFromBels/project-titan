import { getUserMarketAPI } from "@/features/api/profile-market-api";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProfileMarketContent({ user_id }: { user_id: string }) {
  const marketContent = use(getUserMarketAPI(user_id));

  if (!marketContent) {
    return <h1>У пользователя нет товаров на рынке</h1>;
  }

  return (
    <div className="w-[98%] max-w-[98%] m-auto my-1 p-4 bg-background border rounded-xl pb-16">
      <div className="mb-2">
        <h1 className="text-lg">Товары на рынке</h1>
      </div>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {marketContent.map((e, index) => (
          <Link
            href={`/market/${e.content_id}`}
            key={index}
            className="relative max-w-[250px] h-[200px] cursor-pointer lg:hover:scale-[101%]"
          >
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
              <p className="text-xs">
                {e.current_shows} / {e.total_shows} показов
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
