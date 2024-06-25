"use client";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface IContinueMarketCreate {
  croppedImage: string;
}

const ContinueMarketCreate = ({ croppedImage }: IContinueMarketCreate) => {
  const [name, setName] = useState("");
  const [totalShows, setTotalShows] = useState("");
  const [webSiteLink, setWebSiteLink] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const price_per_show = `${100 / +totalShows}`;
    const formData = new FormData();
    const res = await fetch(croppedImage);
    const photo = await res.blob();
    formData.append("photo", photo);

    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");

    // console.log(accessToken);
    // console.log(refreshToken);

    const response = await fetch(
      `https://market-api.titanproject.top/create?name=${name}&price_peer_show=${price_per_show}&total_shows=${totalShows}&link=${webSiteLink}&category=${category}`,
      {
        method: "POST",
        body: formData,
        headers: new Headers({
          ...(accessToken && { accessToken: accessToken }),
          ...(refreshToken && { refreshToken: refreshToken }),
        }),
      }
    );

    if (response.ok) {
      router.push("/market");
      toast.success("Ваш заказ обработан", {
        description: "Теперь он досупен в market!",
      })
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-2 items-center">
      <img
        src={croppedImage}
        alt="Preview"
        className="mb-2 rounded-lg w-[300px] h-[300px]"
      />
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[300px]">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название рекламы"
        />
        <Input
          value={totalShows}
          onChange={(e) => setTotalShows(e.target.value)}
          type="number"
          placeholder="Колличество показов"
        />
        <Input
          value={webSiteLink}
          onChange={(e) => setWebSiteLink(e.target.value)}
          type="text"
          placeholder="Ссылка на ваш сайт"
        />
        <Select onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выбирете категорию" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectItem value="Веб-Сайт">Веб-Сайт</SelectItem>
            <SelectItem value="Социальная сеть (telegram)">Социальная сеть (telegram)</SelectItem>
            <SelectItem value="Социальная сеть (youtube)">Социальная сеть (youtube)</SelectItem>
            <SelectItem value="Социальная сеть (whatsapp)">Социальная сеть (whatsapp)</SelectItem>
            <SelectItem value="Социальная сеть (instagram)">Социальная сеть (instagram)</SelectItem>
            <SelectItem value="Социальная сеть (twitter)">Социальная сеть (twitter)</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">Создать рекламу</Button>
      </form>
    </div>
  );
};

export default ContinueMarketCreate;
