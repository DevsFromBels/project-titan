import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { User } from "@/shared/types/auth.types";
import { GlobeIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface IMobileTabs extends User {}

const MobileTabs = (user: IMobileTabs) => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[58px] border-t flex gap-4 justify-between items-center p-4">
      <Link href={"/"} className="flex flex-col items-center text-sm gap-1">
        <GlobeIcon className="w-[30px] h-[30px]" />
        <p>General</p>
      </Link>
      <Link href={'/search'} className="flex flex-col items-center text-sm gap-1">
        <MagnifyingGlassIcon className="w-[30px] h-[30px]" />
        <p>Search</p>
      </Link>
      <Link href={`/${user.id}`} className="flex flex-col items-center text-sm gap-1">
        <Avatar className="w-[30px] h-[30px]">
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
