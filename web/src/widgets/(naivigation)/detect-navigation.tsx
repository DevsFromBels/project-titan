"use client";
import React, { useEffect, useMemo, useState } from "react";
import MobileTabs from "./mobile-tabs";
import SideBar from "./side-bar";
import CenterLoader from "../center-loader/center-loader";
import useUser from "@/shared/hooks/use-user";
import { useWindowSize } from "@uidotdev/usehooks";
import useProfile from "@/shared/hooks/use-profile";

const DetectNavigation = () => {
  const [componentLoading, setComponentLoading] = useState<boolean>(true);
  const { loading: userLoading, user } = useUser();
  const userData = useMemo(() => user, [user]);
  const { profile, loading: profileLoading } = useProfile({
    name: userData?.id || "",
  });
  const profileData = useMemo(() => profile, [profile]);

  const size = useWindowSize();

  useEffect(() => {
    setComponentLoading(false);
  }, []);

  if (!userData?.id || !userData?.name) {
    return null;
  }

  if (componentLoading || userLoading || profileLoading) {
    return <CenterLoader />;
  }

  const isMobile = size?.width && size.width <= 1023.8;

  if (isMobile) {
    return userData && profileData ? (
      <MobileTabs {...userData} profile={profileData} key="mobile" />
    ) : null;
  }

  return <SideBar {...userData} key="desktop" />;
};

export default DetectNavigation;