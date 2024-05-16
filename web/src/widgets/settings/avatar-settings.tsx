'use client'
import { IUseProfile } from "@/shared/hooks/use-profile";
import Image from "next/image";
import React from "react";

interface IUserAvatarProps {
  avatarUrl: IUseProfile['profile']['avatar_url'];
}

const AvatarSettingsWidget: React.FC<IUserAvatarProps> = ({ avatarUrl }) => {
  return (
    <div className="border rounded-xl mt-5 p-4 flex flex-col gap-2">
      User Avatar
      <Image src={avatarUrl} className="rounded-full w-[120px] h-[120px]" alt="User avatar" />
    </div>
  );
};

export default AvatarSettingsWidget;
