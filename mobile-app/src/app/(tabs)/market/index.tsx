import { Button } from "@/components/ui/Button";
import { Picker } from "@react-native-picker/picker";
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
    `https://market-api.titanproject.top/getMarket?page=${page}&limit=20`
  ).then((res) => res.json());

  return res;
}

const market = () => {
  const [data, setData] = useState<IGetMarket | null>();
  const [page, setPage] = useState(1);
  const [imageErrors, setImageErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedSocialNetwork, setSelectedSocialNetwork] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const newData = await getData(page);
      let combinedData = data
        ? [...data.items, ...newData.items]
        : newData.items;

      if (selectedSocialNetwork) {
        combinedData = combinedData.filter(
          (item) => item.category === selectedSocialNetwork
        );
      }

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
  }, [page, selectedSocialNetwork]);

  useEffect(() => {
    setPage(1);
    setData(null);
  }, []);
  

  const handleImageError = (contentId: string) => {
    setImageErrors((prevErrors) => [...prevErrors, contentId]);
  };

  const loadMoreData = () => {
    if (!isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSocialNetworkChange = (itemValue: string) => {
    setSelectedSocialNetwork(itemValue);
    setPage(1);
    setData(null);
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
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
      style={{ marginBottom: 50 }}
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
      <View className="border border-white rounded-xl m-2 ">
        <Picker
          selectedValue={selectedSocialNetwork}
          onValueChange={handleSocialNetworkChange}
          style={{ color: "white" }}
        >
          <Picker.Item label="Все" value="" />
          <Picker.Item label="Веб-Сайт" value="Веб-Сайт" />
          <Picker.Item
            label="Социальная сеть (telegram)"
            value="Социальная сеть (telegram)"
          />
          <Picker.Item
            label="Социальная сеть (whatsapp)"
            value="Социальная сеть (whatsapp)"
          />
          <Picker.Item
            label="Социальная сеть (instagram)"
            value="Социальная сеть (instagram)"
          />
          <Picker.Item
            label="Социальная сеть (twitter)"
            value="Социальная сеть (twitter)"
          />
        </Picker>
      </View>
      <View className="grid grid-cols-1 overflow-y-auto overflow-hidden">
        {data?.items.map((e) => (
          <React.Fragment key={e.content_id}>
            {!imageErrors.includes(e.content_id) && (
              <View className="w-full h-auto max-h-[430px] break-all flex flex-col border-white border rounded-xl p-2 mb-5">
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
                  <Text className="w-[200px] max-h-[100px] text-ellipsis text-xl overflow-hidden text-white">
                    Название: {e.name}
                  </Text>
                  <Text className="text-ellipsis text-xl overflow-hidden text-white">
                    Показов: {e.current_shows} / {e.total_shows}
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
