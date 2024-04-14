'use client'
import useIsMobile from "@/shared/hooks/is-mobile-hook";
import Link from "next/link";
import React from "react";
import TabsMobile from "./tabs-mobile";
import { ModeToggle } from "../../maleculas/mode-toggle";

const Header = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <TabsMobile/>
  }
  
  return (
    <header className="w-[95%] h-[3rem] m-auto flex justify-between items-center">
      <div>
        <Link href="/">Titan Project</Link>
      </div>
      <nav className="flex gap-3 items-center">
        <Link href="/sign-in">Sign In</Link>
        <Link href="/sign-up">Sign up</Link>
        <ModeToggle/>
      </nav>
    </header>
  );
};

export default Header;
