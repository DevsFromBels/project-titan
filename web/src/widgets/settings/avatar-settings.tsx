"use client";
import { Button } from "@/shared/components/ui/button";
import { IUseProfile } from "@/shared/hooks/use-profile";
import { Aperture } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface IUserAvatarProps {
  avatarUrl: IUseProfile["profile"]["avatar_url"];
  id: IUseProfile["profile"]["user"]["id"];
}

const AvatarSettingsWidget: React.FC<IUserAvatarProps> = ({
  avatarUrl,
  id,
}) => {
  const router = useRouter();

  const handleGOAvatarEdit = () => {
    router.push(`/profile/${id}/avatar-upload`);
  };

  return (
    <div className="border rounded-xl mt-5 p-4 flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Aperture />
        <p>UI and Avatar Settings</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        {avatarUrl && (
          <Image
            src={`https://avatars-api.titanproject.top${avatarUrl}`}
            draggable={false}
            width={120}
            height={120}
            className="rounded-full w-[120px] h-[120px]"
            alt="User avatar"
          />
        )}
        <div>
          <Button onClick={handleGOAvatarEdit} variant="outline">
            {avatarUrl ? "Изменить аватар" : "Добавить аватар"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvatarSettingsWidget;
