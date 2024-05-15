import Link from "next/link";
import Image from "next/image";
import React from "react";

interface IProfileMainBlockWidget {
  image: string;
  username: string;
  id: string;

}

const ProfileMainBlockWidget = ({
  id,
  image,
  username,
}: IProfileMainBlockWidget) => {
  // let porfileImage = 'https://avatars-api.titanproject.top' + image;
  let porfileImage = "https://avatars-api.titanproject.top" + image;

  console.log(porfileImage)
  console.log(image)

  if (!image) {
    porfileImage = "https://titanproject.top/cat.jpeg";
  }

  return (
    <div className="relative w-screen lg:w-[calc(100vw_-_250px)] flex flex-col justify-center items-center h-[200px] gap-2 bg-[#222]">
      <div className="blur-[50px] w-[60px] h-[60px] rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="relative flex items-start z-10 select-none">
        <Link href={`/profile/${id}/avatar-upload`}>
        <Image
          src={porfileImage}
          className="rounded-full shadow-lg shadow-cyan-500/10 border border-slate-100"
          width={100}
          height={100}
          alt="profile image"
          draggable={false}
          priority
        />
        </Link>
      </div>
      <h1 className="font-medium text-2xl text-white ">{username}</h1>
    </div>
  );
};

export default ProfileMainBlockWidget;
