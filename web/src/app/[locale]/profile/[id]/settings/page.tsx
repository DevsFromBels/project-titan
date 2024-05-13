"use client";
import useSettings from "@/shared/hooks/use-settings";
import CenterLoader from "@/widgets/center-loader/center-loader";
import React from "react";
import { redirect } from "next/navigation";
import { Fingerprint} from "lucide-react";
import ProfileSettingsWidget from "@/widgets/settings/profile-settings";
import UserSettingsWidget from "@/widgets/settings/user-settings";

const page = () => {
  const { data, loading } = useSettings();

  if (loading) {
    return <CenterLoader />;
  }

  if (!data?.userSettings.id) {
    return redirect("/sign-in");
  }

  return (
    <div className="w-[95%] mx-auto flex flex-col gap-2">
      <ProfileSettingsWidget
        info={data.profileSettings.info}
        address={data.profileSettings.address}
      />
      <UserSettingsWidget
        name={data?.userSettings.name}
        id={data?.userSettings.id}
        email={data?.userSettings.email}
        role={data?.userSettings.role}
      />
      <div className="border rounded-xl mt-5 p-4 flex flex-col gap-2">
        <div className="flex gap-2">
          <Fingerprint />
          <h1>Security</h1>
        </div>
        <div>
          <span>Is Profile Public</span>
          <div>{data?.profileSettings.isPublic ? true : false}</div>
        </div>
      </div>
    </div>
  );
};

export default page;
