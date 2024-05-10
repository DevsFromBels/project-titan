import React from "react";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/Logo.svg";
import { Home, Plus } from "lucide-react";
import { User } from "@/shared/types/auth.types";

interface ISideBar extends User {}

const SideBar = (user: ISideBar) => {
  return (
    <aside className="absoulte top-0 left-0 min-w-[250px] max-w-[250px] flex flex-col h-auto border-r p-2">
      <div>
        <Image src={logo} alt="app logo" />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          variant="ghost"
          className="flex justify-start h-[45px] rounded-xl"
          asChild
        >
          <Link href="/" className="flex gap-2 justify-start items-center">
            <Home />
            General
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
            <Plus /> Create
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
            Profile
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default SideBar;
