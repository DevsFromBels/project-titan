import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { MarketPostArray } from "@/types/market.types";
import { router } from "expo-router";
import { IGetMarket } from ".";

async function getSimilarProducts(post_id: string): Promise<IGetMarket> {
  const res: IGetMarket = await fetch(
    `https://market-api.titanproject.top/get-similar-products?content_id=${post_id}&page=1&limit=5`,
    {
      method: "GET",
    }
  ).then((res) => res.json());

  return res;
}

const SimilarProducts = ({ post_id }: { post_id: string }) => {
  const [data, setData] = useState<IGetMarket | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      const products: IGetMarket = await getSimilarProducts(post_id);
      setData(products);
      setIsLoading(false);
    })();
  }, [post_id]);

  if (isLoading) {
    return (
      <View className="bg-[#121111] h-screen w-screen flex justify-center items-center">
        <ActivityIndicator className="w-[50px] h-[50px]" color="white" />
      </View>
    );
  }

  if (!data?.items.length) {
    return (
      <View className="flex justify-center items-center bg-[#121111]">
        <Text className="text-white text-xl ">Похожих товаров не найдено</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        backgroundColor: "#121111",
      }}
    >
      {data?.items.map((e) => (
        <View
          key={e.content_id}
          style={{
            padding: 10,
            width: "50%",
            marginBottom: 10,
            borderRadius: 10,
          }}
        >
          <Pressable
            onPress={() => router.replace(`/(tabs)/market/${e.content_id}`)}
          >
            <View
              style={{
                position: "relative",
                width: "100%",
                height: 190,
                borderRadius: 20,
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                  borderRadius: 12,
                }}
                source={{
                  uri: `https://market-api.titanproject.top${e.content}`,
                }}
                onError={() => console.log("Image error")}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  padding: 8,
                  borderRadius: 12,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16, maxHeight: 40 }}>
                  {e.name}
                </Text>
                <Text style={{ color: "#fff", fontSize: 14 }}>
                  Осталось показов: {e.current_shows} / {e.total_shows}
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default SimilarProducts;
