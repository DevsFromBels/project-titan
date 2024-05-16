import React, { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Link } from "@/navigation";
import Image from "next/image";
import logoLight from "@/../public/logo_light.svg";
import logoDark from "@/../public/logo_dark.svg";
import {
  CircleDollarSign,
  Contact,
  Home,
  MessageCircle,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import { User } from "@/shared/types/auth.types";
import { useTranslations } from "next-intl";
import { ModeToggleMenu } from "@/shared/components/maleculas/mode-toggle-menu";
import { useTheme } from "next-themes";

interface ISideBar extends User {}

const SideBar = (user: ISideBar) => {
  const { theme } = useTheme();
  const t = useTranslations("tabs");
  const tm = useTranslations("menu");

  return (
    <aside className="relative z-6 min-w-[250px] max-w-[250px] flex flex-col">
      <div className="fixed h-[100vh] min-w-[250px] max-w-[250px] border-r p-2">
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center">
              <Image
                src={theme === "light" ? logoLight : logoDark}
                className="w-[130px] h-[130px]"
                alt="app logo"
              />
            </div>
            <Button
              variant="ghost"
              className="flex justify-start h-[45px] rounded-xl"
              asChild
            >
              <Link href="/" className="flex gap-2 justify-start items-center">
                <Home />
                {t("general")}
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex justify-start h-[45px] rounded-xl"
              asChild
            >
              <Link
                href={`/market`}
                className="flex gap-2 justify-start items-center"
              >
                <CircleDollarSign /> {t("market")}
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex justify-start h-[45px] rounded-xl"
              asChild
            >
              <Link
                href={`/messages`}
                className="flex gap-2 justify-start items-center"
              >
                <MessageCircle /> {tm("messages")}
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex justify-start h-[45px] rounded-xl"
              asChild
            >
              <Link
                href={`/profile/${user.id}/create`}
                className="flex gap-2 justify-start items-center"
              >
                <Plus /> {t("create")}
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex justify-start h-[45px] rounded-xl"
              asChild
            >
              <Link
                href={`/profile/${user.id}/search`}
                className="flex gap-2 justify-start items-center"
              >
                <Search /> {t("search")}
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex justify-start h-[45px] rounded-xl"
              asChild
            >
              <Link
                href={`/profile/${user.id}/subscriptions`}
                className="flex gap-2 justify-start items-center"
              >
                <Contact /> {tm("subscriptions")}
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex justify-start h-[45px] rounded-xl"
              asChild
            >
              <Link
                href={`/profile/${user.id}/settings`}
                className="flex gap-2 justify-start items-center"
              >
                <Settings /> {tm("settings")}
              </Link>
            </Button>
          </div>

          <div className="flex flex-col border p-1 rounded-2xl gap-1">
            <Button
              variant="ghost"
              className="flex justify-start h-[45px] rounded-xl"
              asChild
            >
              <Link
                href={`/profile/${user.id}`}
                className="flex gap-2 justify-start items-center"
              >
                {t("profile")}
              </Link>
            </Button>
            <ModeToggleMenu />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
