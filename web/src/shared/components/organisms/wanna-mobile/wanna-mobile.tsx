"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import useIsMobile from "@/shared/hooks/is-mobile-phone-hooks";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";

const WannaMobile = () => {
  const isMobile = useIsMobile();
  const componentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("mobileForWeb")) {
      document.body.style.overflow = "auto";
      hideComponent();
    } else {
      document.body.style.overflow = "hidden";
      if (componentRef.current) {
        gsap.fromTo(
          componentRef.current,
          { y: "100%" },
          { y: 0, duration: 0.5, ease: "easeOut" }
        );
      }
    }
  }, []);

  const hideComponent = () => {
    if (componentRef.current) {
      gsap.to(componentRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "easeIn",
        onComplete: () => {
          componentRef.current?.remove();
        },
      });
    }
  };

  const handleContinueWithWeb = () => {
    sessionStorage.setItem("mobileForWeb", "true");
    document.body.style.overflow = "auto";
    hideComponent();
  };

  const handleContinueWithMobile = () => {
    const appLink = "mobile-app://";
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.indexOf("android") > -1;
    const isIOS = userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipad") > -1;
  
    if (isAndroid || isIOS) {
      window.location.href = appLink;
    } else {
      router.push("/download");
    }
  };

  if (!isMobile) {
    return null;
  }

  return (
    <div
      ref={componentRef}
      className="fixed bottom-2 left-0 right-0 w-[95%] h-[200px] flex flex-col bg-black m-auto rounded-lg text-white p-2 z-[999] justify-center"
    >
      <h2 className="text-center">Do you wanna use a mobile app?</h2>
      <div className="flex flex-col gap-2 p-2">
        <Button onClick={handleContinueWithWeb}>Continue with web</Button>
        <p className="text-center">OR</p>
        <Button onClick={handleContinueWithMobile}>Continue with mobile</Button>
      </div>
    </div>
  );
};

export default WannaMobile;