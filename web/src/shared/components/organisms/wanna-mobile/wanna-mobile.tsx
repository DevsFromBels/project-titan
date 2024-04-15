"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import useIsMobile from "@/shared/hooks/is-mobile-phone-hooks";
import { Button } from "../../ui/button";

const WannaMobile = () => {
  const isMobile = useIsMobile();
  const componentRef = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem("mobileForWeb")) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        componentRef.current,
        { y: "100%" },
        { y: 0, duration: 0.5, ease: "easeOut" }
      );
    }
  }, []);

  if (!isMobile) {
    return null;
  }

  const handleContinueWithWeb = () => {
    sessionStorage.setItem("mobileForWeb", "true");
    document.body.style.overflow = "auto";
  };

  return (
    <div
      ref={componentRef}
      className="fixed bottom-0 left-0 right-0 w-[95%] h-[200px] flex flex-col bg-black m-auto rounded-lg text-white p-2 z-[999] justify-center"
    >
      <h2 className="text-center">Do you wanna use a mobile app?</h2>
      <div className="flex flex-col gap-2 p-2">
        <Button onClick={handleContinueWithWeb}>Continue with web</Button>
        <p className="text-center">OR</p>
        <Button>Continue with mobile</Button>
      </div>
    </div>
  );
};

export default WannaMobile;
