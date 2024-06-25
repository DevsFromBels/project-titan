import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { User } from "@/shared/types/auth.types";
import { Link } from "@/navigation";
import {
  Home,
  Plus,
  CircleDollarSignIcon,
  Menu,
  MessageCircle,
  Contact,
  Settings,
  Bell,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Cross1Icon } from "@radix-ui/react-icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { ModeToggleMenu } from "@/shared/components/maleculas/mode-toggle-menu";
import { IUseProfile } from "@/shared/hooks/use-profile";

interface IMobileTabs extends User, IUseProfile {}

const MobileTabs = (user: IMobileTabs) => {
  const t = useTranslations("tabs");
  const tm = useTranslations("menu");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="max-w-screen-sm mx-auto h-[58px] flex gap-7 sm:gap-20 md:gap-30 justify-center items-center p-4">
        <Link href={"/"} className="flex flex-col items-center text-sm gap-1">
          <Home className="w-[20px] h-[20px]" />
          <p>{t("general")}</p>
        </Link>
        <Link
          href={`/market`}
          className="flex flex-col items-center text-sm gap-1"
        >
          <CircleDollarSignIcon className="w-[20px] h-[20px]" />
          <p>{t("market")}</p>
        </Link>

        <Drawer>
          <DrawerTrigger>
            <div className="flex flex-col items-center text-sm gap-1">
              <Menu className="w-[20px] h-[20px]" />
              <p>{t("menu")}</p>
            </div>
          </DrawerTrigger>
          <DrawerContent className="h-[60vh]">
            <DrawerClose>
              <div className="absolute top-2 right-2 rounded-full w-[50px] h-[50px] border flex justify-center items-center">
                <Cross1Icon />
              </div>
            </DrawerClose>
            <DrawerHeader>
              <h1 className="text-xl font-bold text-center">{t("menu")}</h1>
            </DrawerHeader>
            <div className="w-[95%] flex flex-col gap-4 mx-auto">
              <div className="flex flex-col justify-center gap-1 border p-2 rounded-lg">
                <Link
                  href={`/profile/${user.id}/notifications`}
                  className="p-2 flex gap-2 items-center"
                >
                  <Bell />
                  {tm("notifications")}
                </Link>
                <Link
                  href={`/profile/${user.id}/subscriptions`}
                  className="p-2 flex gap-2 items-center"
                >
                  <Contact />
                  {tm("subscriptions")}
                </Link>
                <DrawerClose>
                  <Link
                    href={`/profile/${user.id}/settings`}
                    className="p-2 flex gap-2 items-center"
                  >
                    <Settings />
                    {tm("settings")}
                  </Link>
                </DrawerClose>
              </div>

              <div className="flex flex-col justify-center gap-1 border p-2 rounded-lg">
                <Link href={"/"} className="p-2">
                  {tm("about")}
                </Link>
                <Link href={"/"} className="p-2">
                  {tm("FAQ")}
                </Link>
              </div>
            </div>
            <DrawerFooter className="p-4">
              <ModeToggleMenu />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Link
          href={`/profile/${user.id}/create`}
          className="flex flex-col items-center text-sm gap-1"
        >
          <Plus className="w-[20px] h-[20px]" />
          <p>{t("create")}</p>
        </Link>
        <Link
          href={`/profile/${user.id}`}
          className="flex flex-col items-center text-sm gap-1"
        >
          <Avatar className="w-[20px] h-[20px] bg-cover p-0 rounded-full">
            {user.profile.avatar_url && (
              <AvatarImage
                src={`https://avatars-api.titanproject.top${user.profile.avatar_url}`}
                alt={user.name}
              />
            )}
            <AvatarFallback>
              {user?.name?.slice(0, 2).toUpperCase() || "SH"}
            </AvatarFallback>
          </Avatar>
          <p>{t("profile")}</p>
        </Link>
      </div>
    </div>
  );
};

export default MobileTabs;
