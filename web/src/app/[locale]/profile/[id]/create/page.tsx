"use client";
import React, { useState } from "react";
import { Slider } from "@/shared/components/ui/slider";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "@/navigation";

const Page = () => {
  const [sliderValue, setSliderValue] = useState<number>(50000);
  const [adsName, setAdsName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const price_peer_show = 10 / sliderValue;
    const formData = new FormData();

    if (file) {
      formData.append("photo", file);
    }

    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");

    const response = await fetch(
      `https://market-api.titanproject.top/create?name=${adsName}&price_peer_show=${price_peer_show}&total_shows=${sliderValue}`,
      {
        method: "POST",
        body: formData,
        headers: {
          ...(accessToken && { accessToken: accessToken }),
          ...(refreshToken && { refreshToken: refreshToken }),
        },
      }
    );

    setFile(null);
    setSliderValue(50000);
    setAdsName("");

    if(response.ok) {
      router.push("/market")
    }
    
    // console.log("Form submitted with slider value:", sliderValue);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="w-[95%] m-auto flex justify-center items-center flex-col">
      <form
        onSubmit={handleSubmit}
        className="w-[320px] sm:w-[500px] flex flex-col gap-5"
      >
        <h1 className="text-center text-xl">Create your AD'S now!</h1>
        <Input
          type="text"
          placeholder="Your AD'S name"
          value={adsName}
          onChange={(event) => setAdsName(event.target.value)}
        />
        <Input type="file" name="image" accept="image/*" onChange={handleFileChange} />
        <Slider
          value={[sliderValue]}
          onValueChange={(newValue) =>
            setSliderValue(newValue as unknown as number)
          }
          max={100000}
          step={500}
        />
        <p>Value: {sliderValue}</p>

        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default Page;
