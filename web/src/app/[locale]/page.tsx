"use client";

import { Link } from "@/navigation";
import ShinyButton from "@/shared/components/magicui/shiny-button";
import WordRotate from "@/shared/components/magicui/word-rotate";
import { AnimatedBeamDemo } from "@/shared/components/maleculas/animatedBeamBlock";
import AnimatedGridPattern from "@/shared/components/ui/animated-grid-pattern";
import useUser from "@/shared/hooks/use-user";
import CenterLoader from "@/widgets/center-loader/center-loader";
import { Separator } from "@radix-ui/react-dropdown-menu";
import dynamic from "next/dynamic";

const GlobalPage = dynamic(() => import("@/views/global/global"), {
  ssr: false,
});

export default function Home() {
  const user = useUser();

  if (user.loading) {
    return <CenterLoader />;
  }

  if (user.user?.name) {
    return <GlobalPage />;
  }

  return (
    <div className="w-screen">
      <div className="relative h-[200px] flex flex-col gap-6 items-center justify-center mb-4 text-center p-2">
        <h1 className="text-lg">
          Единая платформа для продажи рекламы в
          <WordRotate
            className="text-4xl font-bold text-black dark:text-white"
            words={[
              "YouTube",
              "Twitter (X)",
              "Telegram",
              "Whatsapp",
              "Instagram",
            ]}
          />
        </h1>
        <AnimatedGridPattern maxOpacity={0.4} className="z-10 blur-[6px]" />
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        {/* <div className="w-[500px] flex flex-col gap-2">
          <h1 className="text-xl font-medium">Как это работает?</h1>
          <p>
            Пользователь имеет возможность создать рекламу, внести баланс и
            выбрать колличество просмотров от суммы указанной пользователем.
          </p>
          <p>
            Пользователь который хочет прорекламировать вас где-либо, заходит на
            рынок, и нажимает подключить.
          </p>
          <p>
            После подключения ему будет выдана реферальная ссыкла а так же
            возможность получить денежное возногрждаение от пользователя
            создавший рекламу.
          </p>
        </div> */}
        <div className="max-w-[500px] flex flex-col justify-center items-center">
          <AnimatedBeamDemo />
          <p className="text-sm">
            Создайте 1 рекламу для всех социальных сетей
          </p>
        </div>
        <Separator className="my-5" />
        <div className="flex flex-col justify-center items-center text-center gap-2 mb-5">
          <div>
            <h1 className="text-2xl">
              Начните продавать рекламу прямо сейчас!
            </h1>
            <p className="text-lg">
              Стать пользователем нашей платформы можно уже сейчас
            </p>
          </div>
          <div className="w-[150px]">
            <Link href="/sign-up">
              <ShinyButton text="Регистрация" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
