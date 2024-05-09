"use client";
import useIsMobile from "@/shared/hooks/is-mobile-phone-hooks";
import React, { useMemo } from "react";
import MobileTabs from "./mobile-tabs";
import SideBar from "./side-bar";
import CenterLoader from "../center-loader/center-loader";
import useUser from "@/shared/hooks/use-user";

const DetectNavigation = () => {
  const { isMobile, isLoading } = useIsMobile();
  const { loading: userLoading, user } = useUser();
  const userData = useMemo(() => user, [user]);

  if (!userData?.id || !userData?.name) {
    return null;
  }

  if (isLoading || userLoading) {
    return <CenterLoader />;
  }

  return (
    <>
      {isMobile ? (
        <MobileTabs {...userData} key="mobile" />
      ) : (
        <SideBar key="desktop" />
      )}
    </>
  );
};

export default DetectNavigation;
