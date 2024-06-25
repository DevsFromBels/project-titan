"use client";

import React from "react";
import { Button } from "../ui/button";
import useUser from "@/shared/hooks/use-user";
import Cookies from "js-cookie";
import { toast } from "sonner";

type TSubscribeButton = {
  postId: string;
};

const SubscribeButton = ({ postId }: TSubscribeButton) => {
  const { user, loading } = useUser();

  if (loading || !user?.id) return null;

  const handleSubscribe = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");

    const res = await fetch(
      `https://market-api.titanproject.top/subscribe?product_id=${postId}`,
      {
        method: "POST",
        headers: new Headers({
          ...(accessToken && { accessToken: accessToken }),
          ...(refreshToken && { refreshToken: refreshToken }),
        }),
      }
    );

    if (res.ok) {
      toast.success("Вы успешно подписались", {
        description: "Теперь вы можете посомотреть эту рекламу в подписках!",
      });
    }
    console.log("subscribe");
    console.log(postId);
  };

  return <Button onClick={handleSubscribe}>Подписаться</Button>;
};

export default SubscribeButton;
