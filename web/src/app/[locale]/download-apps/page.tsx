"use client";
import { Button } from "@/shared/components/ui/button";
import { TabletSmartphone } from "lucide-react";
import React from "react";
import { SyntheticEvent } from "react";

const DownloadPage = () => {
  const handleDownload = (e: SyntheticEvent) => {
    e.preventDefault()

    const downloadUrl =
      "https://expo.dev/artifacts/eas/rKWL3wRF3rFkPSrqjVjHfP.apk";
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", "titan-app.apk");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-[calc(100vh_-_58px)] flex flex-col items-center justify-center gap-3">
      <TabletSmartphone width={120} height={120}/>
      <div className="flex flex-col gap-3 items-center">
      <h1 className="max-w-[300px] text-center text-lg">Нажмите на кнопку скачать, чтобы скачать приложение</h1>
      <Button className="text-lg" onClick={handleDownload}>Скачать на Android</Button>
      </div>
    </div>
  );
};

export default DownloadPage;
