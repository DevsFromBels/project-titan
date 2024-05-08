import React from "react";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import logo from '@/../public/Logo.svg'

const SideBar = () => {
  return (
    <aside className="absoulte top-0 left-0 max-w-[250px] flex flex-col h-auto border-r p-2">
      <div>
        <Image src={logo} alt="app logo"/>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="ghost">Главня и тренды</Button>
        <Button variant="ghost" asChild>
          <Link href="/nikita">Профиль</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/profile">Создать рекламу</Link>
        </Button>
        <Button variant="ghost">Предложения</Button>
        <Button variant="ghost">Настройки</Button>
      </div>
    </aside>
  );
};

export default SideBar;
