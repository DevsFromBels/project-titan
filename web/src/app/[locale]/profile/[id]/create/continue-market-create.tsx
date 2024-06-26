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
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IContinueMarketCreate {
  croppedImage: string;
}

const schema = z.object({
  name: z.string().min(6, "Название должно быть не менее 6 символов"),
  webSiteLink: z.string().url({ message: "Неверный формат URL" }),
  category: z.string().nonempty("Выберите категорию"),
});

const ContinueMarketCreate = ({ croppedImage }: IContinueMarketCreate) => {
  const [name, setName] = useState("");
  const [totalShows, setTotalShows] = useState<string>("");
  const [webSiteLink, setWebSiteLink] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const router = useRouter();
  const [price, setPrice] = useState(0);

  const {
    register: createPost,
    handleSubmit: validateSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const price_per_show = `${0.02 * +totalShows}`;
    console.log(price_per_show);
    console.log(totalShows);
    const formData = new FormData();
    const res = await fetch(croppedImage);
    const photo = await res.blob();
    // console.log('workds')
    formData.append("photo", photo);

    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");

    // console.log(accessToken);
    // console.log(refreshToken);

    const response = await fetch(
      `https://market-api.titanproject.top/create?name=${name}&price_peer_show=${price_per_show}&total_shows=${totalShows}&link=${webSiteLink}&category=${category}&region=${region}`,
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
        description:
          "Дождитесь одобрения модерации, после он появится на рынке!",
      });
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
        <div className="flex flex-col gap-1">
          <Input
            {...createPost("name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Название рекламы"
          />
          {errors.name && (
            <p className="text-red-600 text-[12px]">
              {errors?.name?.message as string}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Input
            value={totalShows}
            onChange={(e) => {
              const value = e.target.value;
              const number = parseInt(value, 10);
              if (isNaN(number) || number > 100000) {
                return;
              }
              setTotalShows(value);
              setPrice(0.02 * Number(value));
            }}
            type="text"
            placeholder="Колличество показов"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Input
            {...createPost("webSiteLink")}
            value={webSiteLink}
            onChange={(e) => setWebSiteLink(e.target.value)}
            type="text"
            placeholder="Ссылка на ваш сайт"
          />
          {errors.webSiteLink && (
            <p className="text-red-600 text-[12px]">
              {errors?.webSiteLink?.message as string}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выбирете категорию" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="Веб-Сайт">Веб-Сайт</SelectItem>
              <SelectItem value="Социальная сеть (telegram)">
                Социальная сеть (telegram)
              </SelectItem>
              <SelectItem value="Социальная сеть (youtube)">
                Социальная сеть (youtube)
              </SelectItem>
              <SelectItem value="Социальная сеть (whatsapp)">
                Социальная сеть (whatsapp)
              </SelectItem>
              <SelectItem value="Социальная сеть (instagram)">
                Социальная сеть (instagram)
              </SelectItem>
              <SelectItem value="Социальная сеть (twitter)">
                Социальная сеть (twitter)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Select onValueChange={(value) => setRegion(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выбирете Регион" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectItem value="BY">Беларусь</SelectItem>
            <SelectItem value="RU">Россия</SelectItem>
            <SelectItem value="KZ">Казахстан</SelectItem>
            <SelectItem value="MD">Молдова</SelectItem>
            <SelectItem value="AM">Армения</SelectItem>
            <SelectItem value="UZ">Узбекистан</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">Купить рекламу за {price.toFixed(2)} BYN</Button>
      </form>
    </div>
  );
};

export default ContinueMarketCreate;
