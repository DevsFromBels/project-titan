import React from "react";
import { Button } from "@/shared/components/ui/button";

const SideBar = () => {
  return (
    <aside className="absoulte top-0 left-0 w-[280px] flex flex-col h-auto border-r p-2">
      <h1 className="my-5">Titan Project</h1>
      <div className="">
        <Button variant="ghost">Главня и тренды</Button>
        <Button variant="ghost">Профиль</Button>
        <Button variant="ghost">Создать рекламу</Button>
        <Button variant="ghost">Предложения</Button>
        <Button variant="ghost">Настройки</Button>
      </div>
    </aside>
  );
};

export default SideBar;
