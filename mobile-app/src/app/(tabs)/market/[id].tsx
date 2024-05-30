import { Button } from "@/components/ui/Button";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { IMarket } from ".";

async function getDataById(id?: string) {
  const res = await fetch(
    `https://market-api.titanproject.top/getMarket?id=${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: IMarket = await res.json();
  return data;
}

const MarketItem = () => {
  const glob = useGlobalSearchParams<{ id?: string }>();
  const [data, setData] = useState<IMarket | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const id = glob.id;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data: IMarket = await getDataById(id);
      setData(data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  const handleImageError = () => {
    setImageError(true);
  };

  const formatPrice = (price: number) => {
    const formattedPrice = price.toFixed(7);
    return parseFloat(formattedPrice).toString();
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="white" />
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
    <ScrollView className="bg-[#121111] h-screen">
      <View className="w-full h-screen max-h-[430px] break-all flex flex-col gap-2 p-2">
        <View className="w-full h-[300px]">
          <Image
            className="w-full h-full object-cover rounded"
            alt="Image"
            source={{
              uri: `https://market-api.titanproject.top${data.content}`,
            }}
            onError={handleImageError}
          />
        </View>
        <View className="h-full flex flex-col gap-2 p-2">
          <Text className=" text-ellipsis text-xl overflow-hidden text-white">
            Название: <Text className="text-white">{data.name}</Text>
          </Text>
          <Text className="text-ellipsis text-xl overflow-hidden text-white">
            Цена за показ:{" "}
            <Text className="text-white ">
              {formatPrice(data.price_for_show)}$
            </Text>
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
        </View>
      </View>
    </ScrollView>
  );
};

export default MarketItem;
