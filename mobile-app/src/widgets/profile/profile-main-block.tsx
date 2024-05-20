import React from "react";
import { View, Text, Image, SafeAreaView, Pressable } from "react-native";
import { i18n } from "@/localization/i18n";
import * as Localization from "expo-localization";
import { DateOptionsWithMonth } from "@/constants/date-output";
import { Badge } from "@/components/ui/Badge";
import { Pencil } from "lucide-react-native";

interface IProfileMainBlockWidget {
  image: string;
  username: string;
  id: string;
  info: string;
  registerDateString: string;
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

  return (
    <SafeAreaView className="h-full w-screen bg-[#121111]">
      <View className="relative w-screen flex flex-col justify-start items-center h-[100px] gap-2 bg-black">
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
            style={{ position: "absolute", right: 0, bottom: 0, width: 60, height: 30, left: 60 }}
          >
            <Text className="flex text-center" style={{paddingTop: 4}}>
              {i18n.t("edit")} <Pencil width={15} height={15} color="black" />
            </Text>
          </Pressable>
        </View>
        <Text className="font-medium text-2xl">{username}</Text>
      </View>
      <View className="flex flex-col justify-center bg-[#121111] w-[90%] border rounded-xl p-2 border-white m-2 gap-2">
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
      <View className="m-2">
        <Text className="text-white text-2xl ">Все ваши предложения</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileMainBlockWidget;
