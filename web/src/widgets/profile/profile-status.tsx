import { DateOptionsWithMonth } from "@/shared/constants/date-output";
import React from "react";

interface IProfileStatusWidget {
  info: string;
  registerDateString: string;
}

const ProfileStatusWidget = ({
  info,
  registerDateString,
}: IProfileStatusWidget) => {
  const registerDate = new Date(registerDateString).toLocaleString(
    "en-EU",
    DateOptionsWithMonth
  );

  return (
    <div className="w-[98%] m-auto my-1 p-4 flex flex-col gap-1 bg-background border rounded-xl">
      {info && (
        <>
          <p className="text-md">about</p>
          <p className="text-lg">{info}</p>
        </>
      )}
      <p className="text-md">register at</p>
      <time className="text-lg" dateTime={registerDateString}>
        {registerDate}
      </time>
    </div>
  );
};

export default ProfileStatusWidget;
