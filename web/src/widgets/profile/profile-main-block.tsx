import Image from "next/image";
import React from "react";

interface IProfileMainBlockWidget {
  id: string;
  username: string;
}

const ProfileMainBlockWidget = ({id,  username }: IProfileMainBlockWidget) => {
  const image =
    id === "sh1woo"
      ? "https://titanproject.top/sh1woo.jpeg"
      : "https://titanproject.top/cat.jpeg";

  return (
    <div className="relative w-screen lg:w-[calc(100vw_-_250px)] flex flex-col justify-center items-center h-[200px] gap-2 bg-[#222]">
      <div className="blur-[50px] w-[80px] h-[80px] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="relative flex items-start z-10 select-none">
        <Image
          src={image}
          className="rounded-full shadow-lg shadow-cyan-500/10 border border-slate-100"
          width={100}
          height={100}
          alt="profile image"
          draggable={false}
          priority
        />
      </div>
      <h1 className="font-medium text-2xl">{username}</h1>
    </div>
  );
};

export default ProfileMainBlockWidget;
