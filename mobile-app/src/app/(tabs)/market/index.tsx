import { Button } from "@/components/ui/Button";
import { Link, router, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { View, Image, Text, ScrollView, ActivityIndicator } from "react-native";

export interface IGetMarket {
  items: Item[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Item {
  content_id: string;
  content: string;
  name: string;
  link: string;
  user_id: string;
  price_for_show: number;
  total_shows: number;
  current_shows: number;
  category: any;
}

async function getData(page: number): Promise<IGetMarket> {
  const res: IGetMarket = await fetch(
    `https://market-api.titanproject.top/getMarket?page=${page}&limit=10`
  ).then((res) => res.json());

  return res;
}

const market = () => {
  const [data, setData] = useState<IGetMarket | null>();
  const [page, setPage] = useState(1);
  const [imageErrors, setImageErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const newData = await getData(page);
      let combinedData = data
        ? [...data.items, ...newData.items]
        : newData.items;
      setData({
        items: combinedData,
        total: newData.total,
        page: newData.page,
        limit: newData.limit,
        totalPages: newData.totalPages,
      });
      setIsLoading(false);
    };
    fetchData();
  }, [page]);

  const handleImageError = (contentId: string) => {
    setImageErrors((prevErrors) => [...prevErrors, contentId]);
  };

  const formatPrice = (price: number) => {
    const formattedPrice = price.toFixed(7);
    return parseFloat(formattedPrice).toString();
  };

  const loadMoreData = () => {
    if (!isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (isLoading) {
    return (
      <View className="bg-[#121111] h-screen w-screen flex justify-center items-center">
        <ActivityIndicator className="w-[50px] h-[50px]" color="white" />
      </View>
    );
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      className="bg-[#121111] grid grid-cols-1 gap-5 p-5 overflow-y-auto overflow-hidden max-h-full"
      style={{marginBottom: 50}}
      onScroll={({ nativeEvent }) => {
        if (
          nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height >=
          nativeEvent.contentSize.height
        ) {
          loadMoreData();
        }
      }}
      scrollEventThrottle={400}
    >
      <View className="grid grid-cols-1 overflow-y-auto overflow-hidden">
        {data?.items.map((e) => (
          <React.Fragment key={e.content_id}>
            {!imageErrors.includes(e.content_id) && (
              <View
                className="w-full h-auto max-h-[430px] break-all flex flex-col border-white border rounded-xl p-2 mb-5"
                
              >
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
                  <Text className="w-[200px] max-h-[100px] text-ellipsis overflow-hidden text-white">
                    Название: {e.name}
                  </Text>
                  <Text className="w-[200px] text-ellipsis overflow-hidden text-white">
                    Цена за показ: {formatPrice(e.price_for_show)} BYR за показ
                  </Text>
                </View>
                <Button
                  label="Посмотреть"
                  onPress={() => {
                    router.push(`/(tabs)/market/${e.content_id}`);
                  }}
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
