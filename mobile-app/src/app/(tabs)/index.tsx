import { useState } from "react";
import { View, Text } from "react-native";

export default function TabHomeScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View className="h-screen flex items-center justify-center bg-[#121111]">
      <Text className="text-white flex">Приветствуем</Text>
      <Text className="text-white flex">на Titan Advertisiment</Text>
    </View>
  );
}
