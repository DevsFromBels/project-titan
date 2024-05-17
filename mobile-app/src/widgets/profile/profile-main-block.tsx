import React from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import { i18n } from "@/localization/i18n";

interface IProfileMainBlockWidget {
  image: string;
  username: string;
  id: string;
  info: string;
}

const ProfileMainBlockWidget = ({
  id,
  image,
  username,
  info,
}: IProfileMainBlockWidget) => {
  let porfileImage = "https://avatars-api.titanproject.top" + image;

  if (!image) {
    porfileImage = "https://titanproject.top/cat.jpeg";
  }

  return (
    <SafeAreaView className="absolute">
      <View className="relative w-screen flex-1 flex-col justify-start items-center h-[100px] gap-2 bg-background">
        <View className="flex items-start z-10 select-none mt-4">
          <Image
            source={{
              uri: porfileImage,
              width: 100,
              height: 100,
            }}
            className="rounded-full"
          />
        </View>
        <Text className="font-medium text-2xl text-white">{username}</Text>
      </View>
      <View className="flex-1 flex-col bg-black h-screen">
        {info && (
          <View className='flex-1 flex-col border rounded-xl p-2 border-white w-[100px] h-[100px]'>
            <Text className="text-xl text-white">{i18n.t("about")}</Text>
            <Text className="text-lg text-white">{info}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfileMainBlockWidget;
