"use client";

import useUser from "@/shared/hooks/use-user";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileMarketSkeleton from "@/shared/components/maleculas/skeletons/profile-market-skeleton";
import { Button } from "@/shared/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Textarea } from "@/shared/components/ui/textarea";
import { Clipboard } from "lucide-react";
import { toast } from "sonner"

type SubscriptionItem = {
  content_id: string;
  content: string;
  name: string;
  link: string;
  user_id: string;
  price_for_show: number;
  total_shows: number;
  current_shows: number;
  category: string;
};

const formatPrice = (price: number) => {
  return price.toFixed(6) + " BYR";
};

const Page = () => {
  const { user, loading } = useUser();
  const [subs, setSubs] = useState<SubscriptionItem[] | null>(null);
  const [postLoading, setPostLoading] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    textareaRef?.current?.select();
    toast("Код был скапирован", {
      
      description: "Вставте этот код в вашу разметку, и сделайте стили!",
    })
    document.execCommand("copy");
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      const fetchSubscriptions = async () => {
        const response = await fetch(
          `https://market-api.titanproject.top/get-user-subscriptions?token=${user.id}`
        );
        const data = await response.json();
        setSubs(data);
        setPostLoading(false);
      };

      fetchSubscriptions();
    }
  }, [user?.id]);

  if (loading || !user || postLoading) {
    return <ProfileMarketSkeleton />;
  }

  if (!user?.id) {
    router.push("/sign-in");
  }

  if (!user?.id) {
    router.push("/sign-in");
  }

  if(!subs?.length) {
    return <div className="w-full flex justify-center items-center">
      <h2>У вас нет подписок</h2>
    </div>
  }

  return (
    <div className="w-[95%] mt-2 mx-auto">
      <div className="w-[300px] h-[200px] m-auto text-center gap-2 flex flex-col items-center justify-center">
        <h1 className="text-center text-lg ">Ваши подписки</h1>
        <p>Нажмите на получить код, чтобы вставить фрагмент кода на ваш сайт</p>
        {subs.length && (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Получить код</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>Код для вывода вашей рекламы</DialogHeader>
            <div className="relative">
              <Textarea
                readOnly
                ref={textareaRef}
                value={`<iframe src="https://iframe-api.titanproject.top?type=single&token=${user.id}"></iframe>`}
                className="w-full resize-none p-2 rounded-md"
                onFocus={() => textareaRef?.current?.select()}
              />
              <Button onClick={copyToClipboard} className="absolute bottom-2 right-2" variant="ghost">
                <Clipboard width={15} height={15} />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        )}
      </div>
      <div className="grid p-2 border-t-[1px] gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pb-16">
        {subs?.map((post, index) => (
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
