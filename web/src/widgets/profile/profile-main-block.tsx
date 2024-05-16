import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Badge } from "@/shared/components/ui/badge";
import { Pencil, X } from "lucide-react";
import { useClickAway } from "@uidotdev/usehooks";
import { User } from "@/shared/types/auth.types";

interface IProfileMainBlockWidget {
  image: string;
  username: string;
  id: string;
  currentUser: User | undefined;
}

const ProfileMainBlockWidget = ({
  id,
  image,
  username,
  currentUser,
}: IProfileMainBlockWidget) => {
  const [clickOnImage, setClickOnImage] = useState(false);
  const ref = useClickAway<HTMLDivElement>(() => {
    console.log("clicked");
    setClickOnImage(false);
  });

  let porfileImage = "https://avatars-api.titanproject.top" + image;

  if (!image) {
    porfileImage = "https://titanproject.top/cat.jpeg";
  }

  const handleCLickOnImage = () => {
    setClickOnImage(!clickOnImage);
  };

  return (
    <div className="w-screen lg:w-[calc(100vw_-_250px)] h-[200px] flex flex-col justify-center items-center gap-2 bg-[#222]">
      {/* <div className="blur-[50px] w-[60px] h-[60px] rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div> */}
      <div className="relative flex items-start z-10 select-none">
        <Image
          src={porfileImage}
          className="w-[120px] h-[120px] rounded-full shadow-lg shadow-cyan-500/10 border border-slate-100 transition hover:scale-105"
          width={150}
          height={150}
          alt="profile image"
          draggable={false}
          priority
          onClick={handleCLickOnImage}
        />
        {currentUser?.id === id && (
          <Link
            href={`/profile/${id}/avatar-upload`}
            className="absolute right-0 bottom-2"
          >
            <Badge className="flex gap-1">
              Edit <Pencil width={15} height={15} />
            </Badge>
          </Link>
        )}
      </div>
      <h1 className="font-medium text-2xl text-white ">{username}</h1>
      {clickOnImage && (
        <div
          ref={ref}
          className="bg-[#00000090] z-20 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center"
        >
          <X
            onClick={handleCLickOnImage}
            className="absolute right-3 top-3 hover:scale-105 cursor-pointer text-white"
            width={40}
            height={40}
          />
          <Image
            src={porfileImage}
            className="w-[300px] md:w-[400px] rounded-sm shadow-lg transition select-none"
            width={400}
            height={400}
            alt="profile image"
            draggable={false}
            priority
          />
        </div>
      )}
    </div>
  );
};

export default ProfileMainBlockWidget;
