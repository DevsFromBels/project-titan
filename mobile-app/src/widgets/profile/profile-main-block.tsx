import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { i18n } from "@/localization/i18n";
import { DateOptionsWithMonth } from "@/constants/date-output";
import { Pencil } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMarket } from "@/app/(tabs)/market";
import { Button } from "@/components/ui/Button";
import { router } from "expo-router";

interface IProfileMainBlockWidget {
  image: string;
  username: string;
  id: string;
  info: string;
  registerDateString: string;
}

async function getData() {
  const res = await fetch(
    "https://market-api.titanproject.top/get-all-user-market-products",
    {
      method: "GET",
      headers: {
        accessToken: (await AsyncStorage.getItem("access_token")) || "",
        refreshToken: (await AsyncStorage.getItem("refresh_token")) || "",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const info: IMarket[] = await res.json();
  return info;
}

const ProfileMainBlockWidget = ({
  id,
  image,
  username,
  info,
  registerDateString,
}: IProfileMainBlockWidget) => {
  let porfileImage = "https://avatars-api.titanproject.top" + image;

  if (!image) {
    porfileImage = "https://titanproject.top/cat.jpeg";
  }
  const languages = {
    ru: "ru-RU",
    en: "en-US",
  };

  const registerDate = new Date(registerDateString).toLocaleString(
    languages[(i18n.locale as keyof typeof languages) ?? "en"],
    DateOptionsWithMonth
  );

  const [data, setData] = useState<IMarket[]>([]);
  const [imageErrors, setImageErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const info: IMarket[] = await getData();
      setData(info);
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

  if (isLoading) {
    return <ActivityIndicator className="w-[50px] h-[50px]" color="white" />;
  }

  return (
    <SafeAreaView className="h-full w-screen bg-[#121111]">
      <View className="relative w-screen flex flex-col justify-center items-center h-[200px] gap-2 bg-black">
        <View className="flex items-start z-10 select-none mt-4">
          <Image
            source={{
              uri: porfileImage,
              width: 100,
              height: 100,
            }}
            className="relative rounded-full"
          />
          <Pressable
            className="bg-white text-black rounded-xl"
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: 60,
              height: 30,
              left: 60,
            }}
          >
            <Text className="flex text-center" style={{ paddingTop: 4 }}>
              {i18n.t("edit")} <Pencil width={15} height={15} color="black" />
            </Text>
          </Pressable>
        </View>
        <Text className="font-medium text-2xl text-white">{username}</Text>
      </View>
      <View
        className="flex flex-col justify-center bg-[#121111] w-[90%] border rounded-xl p-2 border-[#121111] gap-2"
        style={{ margin: 5 }}
      >
        {info && (
          <View>
            <Text className="text-xl text-white">{i18n.t("about")}</Text>
            <Text className="text-lg text-white">{info}</Text>
          </View>
        )}
        {!info && (
          <View>
            <Text className="text-xl text-white">{i18n.t("about")}</Text>
            <Text className="text-lg text-white">{i18n.t("info")}</Text>
          </View>
        )}
        <View>
          <Text className="text-xl text-white">{i18n.t("registerAt")}:</Text>
          <Text className="text-lg text-white" testID="registerDate">
            {registerDate}
          </Text>
        </View>
      </View>
      <View
        className="p-2 border border-[#121111] rounded-xl w-[90%]"
        style={{ margin: 5 }}
      >
        <Text className="text-white text-xl ">Товары на рынке</Text>
        <View style={{ flex: 1 }} className="h-screen ">
          {data.map((e) => (
            <View key={e.content_id} style={{ width: "50%", padding: 10 }}>
              {!imageErrors.includes(e.content_id) && (
                <View
                  style={{ position: "relative", width: "100%", height: 200 }}
                >
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "cover",
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
                      padding: 10,
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                      {e.name}
                    </Text>
                    <Text style={{ color: "#fff", fontSize: 14 }}>
                      Осталось показов: {e.current_shows} / {e.total_shows}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileMainBlockWidget;
