import ProfileMarketSkeleton from "@/shared/components/maleculas/skeletons/profile-market-skeleton";
import SubscribeButton from "@/shared/components/maleculas/subscribe-button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/components/ui/breadcrumb";
import { Button } from "@/shared/components/ui/button";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger, DrawerHeader } from "@/shared/components/ui/drawer";
import { MarketPost } from "@/shared/types/market.types";
import { Share2Icon, ShareIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { use } from "react";
import ShareMarketPost from "./shareMarketPost";

interface Params {
  id: string;
}

interface PageProps {
  params: Params;
}

const SimilarProducts = dynamic(() => import("./SimilarProducts"), {
  ssr: false,
  loading: () => <ProfileMarketSkeleton />,
});

async function GetSingleProduct(post_id: string) {
  const res: MarketPost = await fetch(
    `https://market-api.titanproject.top/getMarket?id=${post_id}`,
    {
      method: "GET",
      next: {
        revalidate: 1500,
      },
    }
  ).then((res) => res.json());

  return res;
}

export default function Page({ params }: PageProps) {
  const marketPost = use(GetSingleProduct(params.id));

  const formatPrice = (price: number) => {
    const formattedPrice = Math.ceil(price).toFixed(2);
    return formattedPrice.toString();
  };

  return (
    <div className="m-auto flex flex-col gap-5">
      <Breadcrumb className="p-2 text-lg">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/market">Рынок</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{marketPost.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative w-screen lg:w-[calc(100vw_-_250px)] flex flex-col justify-center items-center gap-1 mt-2">
        <Image
          className="rounded select-none w-[250px] h-[250px] z-20"
          src={`https://market-api.titanproject.top${marketPost.content}`}
          width={250}
          height={250}
          draggable={false}
          alt=""
        />
        <h1 className="text-lg">{marketPost.name}</h1>
        <p>Цена за показ: {formatPrice(marketPost.price_for_show)} BYN</p>
        <p>
          Категория: {marketPost.category}
        </p>
        <p>
          Показы: {marketPost.current_shows}/{marketPost.total_shows}
        </p>
        <div className="flex items-center gap-2">
          <SubscribeButton postId={marketPost.content_id}/>
          <Drawer>
            <DrawerTrigger className="border w-[50px] h-[50px] p-1 rounded-full flex items-center justify-center"><ShareIcon width="18px" height="18px"/></DrawerTrigger>
            <DrawerContent className="h-[250px]">
              <DrawerHeader >
                <DrawerTitle className="text-center">Поделиться товаром</DrawerTitle>
              </DrawerHeader>
              <ShareMarketPost id={marketPost.content_id}/>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <div>
        <SimilarProducts post_id={params.id} />
      </div>
    </div>
  );
}
