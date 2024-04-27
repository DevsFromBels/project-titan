"use client";
import Link from "next/link";
import React from "react";

import { ModeToggle } from "../../shared/components/maleculas/mode-toggle";
import { Button } from "../../shared/components/ui/button";

const Header = () => {
  return (
    <header className="w-[95%] h-[3rem] m-auto flex justify-between items-center">
      <div>
        <Link href="/">Titan Project</Link>
      </div>
      <nav className="flex gap-3 items-center text-sm">
        <Link href="/sign-in">Sign In</Link>
        <Link href="/sign-up">
          <Button size="sm">Sign up</Button>
        </Link>
        <ModeToggle />
      </nav>
    </header>
  );
};

export default Header;
