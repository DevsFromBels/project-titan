import { IGetMarket, Item } from ".";
import SimilarProducts from "./Similar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalSearchParams } from "expo-router";
import { Bell, BellRing } from "lucide-react-native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";

async function getDataById(id?: string) {
  const res = await fetch(
    `https://market-api.titanproject.top/getMarket?id=${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: IGetMarket = await res.json();
  return data;
}

const MarketItem = () => {
  const glob = useGlobalSearchParams<{ id?: string }>();
  const [data, setData] = useState<IGetMarket | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [subscribed, setSubscribed] = useState<boolean>();

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
    fetchData();
  }, [id]);

  const handleImageError = () => {
    setImageError(true);
  };

  const formatPrice = (price: number) => {
    const formattedPrice = price.toFixed(2);
    return parseFloat(formattedPrice).toString();
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
        setSubscribed(true);
      }
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
        <View className="w-full h-[300px]" style={{ height: 300 }}>
          <Image
            className="w-full h-full object-cover rounded"
            alt="Image"
            source={{
              uri: `https://market-api.titanproject.top${data.content}`,
            }}
            onError={handleImageError}
          />
        </View>
        <View className="w-screen flex justify-center items-center">
          <Pressable
            className={
              subscribed
                ? "w-[300px] h-[50px] flex justify-center items-center bg-gray-700 rounded-3xl gap-2 flex-row"
                : "w-[300px] h-[50px] flex justify-center items-center bg-white rounded-3xl gap-2 flex-row"
            }
            onPress={handelSubscriptions}
          >
            {subscribed ? <BellRing color="black" /> : <Bell color="black" />}
            {subscribed ? (
              <Text className="text-black">Вы подписаны</Text>
            ) : (
              <Text className="text-black">Подписаться</Text>
            )}
          </Pressable>
        </View>
        <View className="flex flex-col gap-2 p-2">
          <Text className=" text-ellipsis text-xl overflow-hidden text-white">
            Название: {data.name}
          </Text>
          <Text className="text-ellipsis text-xl overflow-hidden text-white">
            Цена за показ: {formatPrice(data.price_for_show)} BYR
          </Text>
          <Text className="text-ellipsis text-xl overflow-hidden text-white">
            Создатель: {data.user_id}
          </Text>
          <Text className="text-ellipsis text-xl overflow-hidden text-white">
            Всего показов: {data.current_shows} / {data.total_shows}
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
