import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { User } from "@/shared/types/auth.types";
import { GlobeIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Home } from "lucide-react";
import { Plus } from "lucide-react";

interface IMobileTabs extends User {}

const MobileTabs = (user: IMobileTabs) => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-[58px] border-t flex gap-4 justify-between items-center bg-background p-4">
      <Link href={"/"} className="flex flex-col items-center text-sm gap-1">
        <Home className="w-[20px] h-[20px]" />
        <p>General</p>
      </Link>
      <Link
        href={`/${user.id.toLowerCase()}/search`}
        className="flex flex-col items-center text-sm gap-1"
      >
        <MagnifyingGlassIcon className="w-[20px] h-[20px]" />
        <p>Search</p>
      </Link>
      <Link
        href={`/${user.id.toLowerCase()}/create`}
        className="flex flex-col items-center text-sm gap-1"
      >
        <Plus className="w-[20px] h-[20px]" />
        <p>Create</p>
      </Link>
      <Link
        href={`/${user.id}`}
        className="flex flex-col items-center text-sm gap-1"
      >
        <Avatar className="w-[20px] h-[20px]">
          {/* <AvatarImage
            className="border"
            src={"https://github.com/shadcn.png"}
            alt={"@shadcn"}
          /> */}
          <AvatarFallback>
            {user?.name?.slice(0, 2).toUpperCase() || "SH"}
          </AvatarFallback>
        </Avatar>
        <p>Profile</p>
      </Link>
    </div>
  );
};

export default MobileTabs;
