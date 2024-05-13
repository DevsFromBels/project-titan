"use client";
import { Input } from "@/shared/components/ui/input";
import useSettings from "@/shared/hooks/use-settings";
import CenterLoader from "@/widgets/center-loader/center-loader";
import React from "react";

const page = () => {
  const { data, loading } = useSettings();

  if (loading) {
    return <CenterLoader />;
  }

  console.log(data?.profileSettings.isPublic);

  return (
    <div className="w-[95%] mx-auto flex flex-col gap-2">
      <div className="border rounded-xl mt-5 p-4 flex flex-col gap-2">
        <h1>Profile Settings</h1>
        <div>
          <span>Info</span>
          <Input placeholder={data?.profileSettings.info} />
        </div>
        <div>
          <span>Is Profile Public</span>
          <div>{data?.profileSettings.isPublic ? true : false}</div>
        </div>
        <div>
          <span>Your address</span>
          <address>{data?.profileSettings.address}</address>
        </div>
      </div>
      <div className="border rounded-xl mt-5 p-4 flex flex-col gap-2">
        <h1>User Settings</h1>
        <div>
          <span>User Name</span>
          <div>{data?.userSettings.name}</div>
        </div>
        <div>
          <span>User Id</span>
          <div>{data?.userSettings.id}</div>
        </div>
        <div>
          <span>Email</span>
          <div>{data?.userSettings.email}</div>
        </div>
        <div>
          <span>Your Role</span>
          <div>{data?.userSettings.role}</div>
        </div>
      </div>
      <div className="border rounded-xl mt-5 p-4 flex flex-col gap-2">
        <h1>Security</h1>
      </div>
    </div>
  );
};

export default page;
