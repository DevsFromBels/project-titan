"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "@/shared/components/ui/button";
import { BadgePlus, Upload } from "lucide-react";
import dynamic from "next/dynamic";

const ContinueMarketCreate = dynamic(() => import('./continue-market-create'), {
  ssr: false
})

interface Props {}

const Page: React.FC<Props> = () => {
  const [cropper, setCropper] = useState<Cropper | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [croppedImage, setCroppedImage] = useState<string | undefined>(undefined);
  const [showCropper, setShowCropper] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Вы можете перетаскивать только изображения.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleCrop = useCallback(() => {
    if (cropper) {
      const cropped = cropper.getCroppedCanvas().toDataURL();
      setCroppedImage(cropped);
      setShowCropper(false);
    }
  }, [cropper, setShowCropper]);

  const handleCancel = useCallback(() => {
    setImage(undefined);
    setShowCropper(false);
    setCroppedImage(undefined);
  }, [setImage, setShowCropper]);

  const handleCropperClick = useCallback(() => {
    const inputElement = document.getElementById(
      "file-input"
    ) as HTMLInputElement | null;
    if (inputElement) {
      inputElement.value = "";
    }
  }, []);

  if (croppedImage) {
    return (
      <ContinueMarketCreate croppedImage={croppedImage}/>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {!showCropper && (
        <div
          {...getRootProps()}
          className={`w-[300px] h-[250px] md:h-[400px] md:w-[500px] p-8 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-300 ${
            isDragActive ? "border-green-500" : ""
          }`}
          onClick={() => {
            const inputElement = document.getElementById("file-input");
            if (inputElement) {
              inputElement.click();
            }
          }}
        >
          <input id="file-input" {...getInputProps()} className="hidden" />
          {image ? (
            <div className="flex flex-col items-center">
              <img
                src={image}
                alt="Preview"
                className="mb-2 rounded-lg w-[300px]"
              />
              <Button onClick={handleCancel}>Отмена</Button>
            </div>
          ) : (
            <p className="w-[300px] flex flex-col items-center justify-center gap-2 text-sm font-medium text-gray-500 text-center">
              {!isDragActive ? (
                <BadgePlus className="w-[60px] h-[60px]" />
              ) : (
                <Upload className="w-[60px] h-[60px]" />
              )}
              Перенесите изображение на меня, или нажмите на меня
            </p>
          )}
        </div>
      )}
      {showCropper && (
        <>
          <div className="relative">
            <Cropper
              src={image}
              style={{ height: 400, width: "400px" }}
              initialAspectRatio={1}
              guides={true}
              viewMode={2}
              autoCropArea={0.8}
              dragMode="move"
              className="mb-2 bg-rose-700"
              aspectRatio={1}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              onClick={handleCropperClick}
            />
          </div>
          <div className="flex gap-2">
            <Button variant={"outline"} onClick={handleCancel}>
              Отмена
            </Button>
            <Button variant={"outline"} onClick={handleCrop}>
              Обрезать
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
