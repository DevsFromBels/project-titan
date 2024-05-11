import React from "react";
import { Button } from "@/shared/components/ui/button";
import { Link } from "@/navigation";
import Image from "next/image";
import logo from "@/../public/Logo.svg";
import { Home, Plus, Search } from "lucide-react";
import { User } from "@/shared/types/auth.types";
import { useTranslations } from "next-intl";

interface ISideBar extends User {}

const SideBar = (user: ISideBar) => {
  const t = useTranslations("tabs");

  return (
    <aside className="relative z-6 min-w-[250px] max-w-[250px] flex flex-col">
      <div className="fixed h-[100vh] min-w-[250px] max-w-[250px] border-r p-2">
        <div>
          <Image src={logo} alt="app logo" />
        </div>
        <div className="absoloute flex-col gap-2">
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
              href={`/${user.id}/create`}
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
              href={`/${user.id}/search`}
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
              href={`/${user.id}`}
              className="flex gap-2 justify-start items-center"
            >
              {t("profile")}
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
