import { IGetMarket, Item } from ".";
import SimilarProducts from "./Similar";
import useUser from "@/hooks/use-user";
import { MarketPost, MarketPostArray } from "@/types/market.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import { router, useGlobalSearchParams } from "expo-router";
import { Bell, BellRing, MoveLeft, ShareIcon } from "lucide-react-native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Share,
} from "react-native";

async function getDataById(id?: string) {
  const res = await fetch(
    `https://market-api.titanproject.top/getMarket?id=${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: MarketPostArray = await res.json();
  return data;
}

const MarketItem = () => {
  const { user, loading } = useUser();
  const glob = useGlobalSearchParams<{ id?: string }>();
  const [data, setData] = useState<MarketPost>([]);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const id = glob.id;

  if (typeof id === "undefined") {
    return null;
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getDataById(id);
      setData(data);
      setIsLoading(false);
    };
    checkSub();
    fetchData();
  }, [id]);

  const handleImageError = () => {
    setImageError(true);
  };

  const checkSub = async () => {
    try {
      const response = await fetch(
        `https://market-api.titanproject.top/get-user-subscriptions?token=${user?.id}`
      );
      if (!response.ok) {
        const data = await response.json();
        return;
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        const isSubscribed = data.some((item: Item) => item.content_id === id);
        setIsSubscribed(isSubscribed);
      } else {
        console.error("Error: Data is not an array");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handelSubscriptions = async () => {
    try {
      const res = await fetch(
        `https://market-api.titanproject.top/subscribe?product_id=${id}`,
        {
          method: "POST",
          headers: new Headers({
            accessToken: (await AsyncStorage.getItem("access_token")) || "",
            refreshToken: (await AsyncStorage.getItem("refresh_token")) || "",
          }),
        }
      );
      if (res.ok) {
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `https://titanproject.top/market/${id}
Титановая Реклама`,
      });
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) {
    return (
      <View className="bg-[#121111] h-screen w-screen flex justify-center items-center">
        <ActivityIndicator className="w-[50px] h-[50px]" color="white" />
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-white">Товар не найден</Text>
      </View>
    );
  }

  if (imageError) {
    return (
      <View className="w-full h-[200px]">
        <Text className="text-white">Изображение недоступно</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="bg-[#121111] mb-6"
      style={{ maxHeight: "100%" }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="w-full break-all flex flex-col gap-2 p-2">
        <View className="flex p-2">
          <Pressable
            onPress={() => {
              router.replace("/market");
            }}
            className="w-[250px] p-2"
          >
            <MoveLeft color="white" />
          </Pressable>
        </View>
        <View className="w-full h-[300px]" style={{ height: 300 }}>
          <Image
            className="w-full h-full object-cover rounded-xl"
            alt="Image"
            source={{
              uri: `https://market-api.titanproject.top${data.content}`,
            }}
            onError={handleImageError}
          />
        </View>
        <View className="w-screen flex justify-center items-center flex-row gap-5">
          <Pressable
            className={
              isSubscribed
                ? "w-[300px] h-[50px] flex justify-center items-center bg-gray-700 rounded-3xl gap-2 flex-row"
                : "w-[300px] h-[50px] flex justify-center items-center bg-white rounded-3xl gap-2 flex-row"
            }
            onPress={handelSubscriptions}
          >
            {isSubscribed ? <BellRing color="black" /> : <Bell color="black" />}
            {isSubscribed ? (
              <Text className="text-black">Вы подписаны</Text>
            ) : (
              <Text className="text-black">Подписаться</Text>
            )}
          </Pressable>
          <Pressable onPress={handleShare}>
            <ShareIcon size="40" color="white" />
          </Pressable>
        </View>
        <View className="flex flex-col gap-2 p-2">
          <Text className=" text-ellipsis text-xl overflow-hidden text-white">
            Название: {data.name}
          </Text>
          <Text className="text-ellipsis text-xl overflow-hidden text-white">
            Создатель: {data.user_id}
          </Text>
          <Text className="text-ellipsis text-xl overflow-hidden text-white">
            Показов: {data.current_shows} / {data.total_shows}
          </Text>
          {data.category && (
            <Text className="text-ellipsis text-xl overflow-hidden text-white">
              Категория: {data.category}
            </Text>
          )}
          <Text className="text-ellipsis text-xl overflow-hidden text-white">
            Похожие товары
          </Text>
          <SimilarProducts post_id={id} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MarketItem;
