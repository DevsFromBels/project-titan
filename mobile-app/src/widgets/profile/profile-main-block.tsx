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
import { IGetMarket } from "@/app/(tabs)/market";
import * as ImagePicker from "expo-image-picker";
import { Link, router } from "expo-router";
import { graphqlClient } from "@/graphql/gql.setup";

interface IProfileMainBlockWidget {
  image: string;
  username: string;
  id: string;
  info: string;
  registerDateString: string;
}

async function getData(user_id: string): Promise<IGetMarket> {
  const res: IGetMarket = await fetch(
    `https://market-api.titanproject.top/get-similar-products?user_id=${user_id}&page=1&limit=15`,
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
  const [data, setData] = useState<IGetMarket | null>();
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
      const post: IGetMarket = await getData(id);
      setData(post);
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
    <SafeAreaView className="h-screen w-screen bg-[#121111]">
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
      <View
        className="p-2 border border-[#121111] h-auto rounded-xl w-[90%]"
        style={{ margin: 5 }}
      >
        <Text className="text-white text-xl ">Товары на рынке</Text>
        <View style={{ flex: 1 }} className="h-full ">
          {data &&
            data.items &&
            data.items.map((e) => (
              <View key={e.content_id} style={{ padding: 10 }}>
                <Pressable
                  onPress={() =>
                    router.replace(`/(tabs)/market/${e.content_id}`)
                  }
                >
                  <View
                    style={{
                      position: "relative",
                      width: "100%",
                      height: 200,
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
              </View>
            ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileMainBlockWidget;
