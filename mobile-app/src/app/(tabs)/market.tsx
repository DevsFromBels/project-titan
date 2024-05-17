import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { Button } from "@/components/ui/Button";

export interface IMarket {
  content_id: string;
  content: string;
  name: string;
  link: string;
  user_id: string;
  price_for_show: number;
}

async function getData() {
  const res = await fetch("https://market-api.titanproject.top/getMarket");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: IMarket[] = await res.json();
  return data;
}

const market = () => {
  const [data, setData] = useState<IMarket[]>([]);
  const [imageErrors, setImageErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data: IMarket[] = await getData();
      setData(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleImageError = (contentId: string) => {
    setImageErrors((prevErrors) => [...prevErrors, contentId]);
  };

  const formatPrice = (price: number) => {
    const formattedPrice = price.toFixed(7);
    return parseFloat(formattedPrice).toString();
  };
  return (
    <ScrollView>
      <View className="bg-black h-screen grid grid-cols-1 gap-4 p-5 overflow-y-auto">
        {data.map((e) => (
          <React.Fragment key={e.content_id}>
            {!imageErrors.includes(e.content_id) && (
              <View className="w-full h-auto max-h-[430px] sm:max-w-[400px] sm:w-[250px] break-all flex flex-col gap-2 border-white border rounded-xl p-2">
                <View className="w-full h-[200px]">
                  <Image
                    className="w-full h-full object-cover rounded"
                    alt="Image"
                    source={{
                      uri: `https://market-api.titanproject.top${e.content}`,
                    }}
                    onError={() => handleImageError(e.content_id)}
                  />
                </View>
                <View className="flex flex-col gap-2 p-2">
                  <Text className="w-[200px] text-ellipsis overflow-hidden text-white">
                    Название:
                    <Text className="text-white">{e.name}</Text>
                  </Text>
                  <Text className="w-[200px] text-ellipsis overflow-hidden text-white">
                    Цена за показ:
                    <Text className="text-white ">{formatPrice(e.price_for_show)}$</Text>
                  </Text>
                </View>
                <Button
                  label="Подключить"
                  onPress={() => router.replace("/")}
                />
              </View>
            )}
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );
};

export default market;
