"use client";
// import useIsMobile from "@/shared/hooks/is-mobile-phone-hooks";
import React, { useEffect, useMemo, useState } from "react";
import MobileTabs from "./mobile-tabs";
import SideBar from "./side-bar";
import CenterLoader from "../center-loader/center-loader";
import useUser from "@/shared/hooks/use-user";
import { useWindowSize } from "@uidotdev/usehooks";

const DetectNavigation = () => {
  const [componentLoading, setComponentLoaidng] = useState<boolean>(true);
  const { loading: userLoading, user } = useUser();
  const userData = useMemo(() => user, [user]);
  const size = useWindowSize();

  useEffect(() => {
    setComponentLoaidng(false)
  }, [])

  if (!userData?.id || !userData?.name) {
    return null;
  }

  if (componentLoading || userLoading) {
    return <CenterLoader />;
  }


  if (size?.width && size.width <= 1023.8) {
    return <MobileTabs {...userData} key="mobile" />;
  }

  return <SideBar {...userData} key="desktop" />;
};

export default DetectNavigation;
