import { DateOptionsWithMonth } from "@/constants/date-output";
import { graphqlClient } from "@/graphql/gql.setup";
import { i18n } from "@/localization/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Pencil } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from "react-native";

interface IProfileMainBlockWidget {
  image: string;
  username: string;
  id: string;
  info: string;
  registerDateString: string;
}

interface UserMarketAPI {
  content_id: string;
  content: string;
  name: string;
  link: string;
  user_id: string;
  price_for_show: number;
  total_shows: number;
  current_shows: number;
  category: string | null;
}

async function getData(user_id: string) {
  const res: UserMarketAPI = await fetch(
    `https://market-api.titanproject.top/get-all-user-market-products?user_id=${user_id}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());

  return res;
}

const ProfileMainBlockWidget = ({
  id,
  image,
  username,
  info,
  registerDateString,
}: IProfileMainBlockWidget) => {
  const [dataMarket, setDataMarket] = useState<UserMarketAPI[]>();
  const [imageErrors, setImageErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean>();
  const [imageProfile, setImageProfile] = useState<string>();

  let porfileImage = "https://avatars-api.titanproject.top" + image;

  const languages = {
    ru: "ru-RU",
    en: "en-US",
  };

  if (!image) {
    porfileImage = "https://titanproject.top/cat.jpeg";
  }

  const registerDate = new Date(registerDateString).toLocaleString(
    languages[(i18n.locale as keyof typeof languages) ?? "en"],
    DateOptionsWithMonth
  );

  useEffect(() => {
    (async () => {
      const post: UserMarketAPI[] = await getData(id);
      setDataMarket(post);
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
      setIsLoading(false);
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageProfile(result.assets[0].uri);
      uploadImage();
    }
  };

  const uploadImage = async () => {
    if (!imageProfile) return;

    const data = new FormData();

    data.append("image", {
      uri: imageProfile,
      type: "image/png",
      name: "profile-image",
    });
    try {
      const response = await fetch(
        "https://avatars-api.titanproject.top/upload",
        {
          method: "POST",
          body: data,
          headers: new Headers({
            accessToken: (await AsyncStorage.getItem("access_token")) || "",
            refreshToken: (await AsyncStorage.getItem("refresh_token")) || "",
          }),
        }
      );
      if (response.ok) {
        console.log("Upload successful");
        graphqlClient.resetStore();
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setIsLoading(false);
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
    <ScrollView className="h-screen w-screen bg-[#121111]">
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
              width: 100,
              height: 30,
              left: 60,
            }}
            onPress={pickImage}
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
      <View className="p-2 rounded-xl w-[90%]">
        <Text className="text-white text-xl" style={{paddingBottom: 5}}>Товары на рынке</Text>
        <View style={{ flex: 1 }} className="h-full">
          {!dataMarket && (
            <View className="flex justify-center items-center">
              <Text className="text-white">
                У пользователя нет товаров на рынке
              </Text>
            </View>
          )}
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, paddingBottom: 100 }}>
            {dataMarket?.map((e) => (
              <React.Fragment key={e.content_id}>
                {!imageErrors.includes(e.content_id) && (
                  <Pressable
                    onPress={() =>
                      router.replace(`/(tabs)/market/${e.content_id}`)
                    }
                    style={{ width: "48%" }}
                  >
                    <View
                      style={{
                        position: "relative",
                        width: "100%",
                        height: 200,
                        marginBottom: 10,
                      }}
                      className="rounded-xl grid grid-cols-2"
                    >
                      <Image
                        style={{
                          width: "100%",
                          height: "100%",
                          resizeMode: "cover",
                        }}
                        className="rounded-xl"
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
                        className="rounded-xl"
                      >
                        <Text style={{ color: "#fff", fontSize: 16 }}>
                          {e.name}
                        </Text>
                        <Text style={{ color: "#fff", fontSize: 14 }}>
                          Осталось показов: {e.current_shows} / {e.total_shows}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileMainBlockWidget;
