import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { View, Text } from "react-native";

export default function TabHomeScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View className="h-screen flex items-center justify-center bg-[#121111]">
      <Text className="text-white flex">Welcome</Text>
      <Text className="text-white flex">on Titan Advertisiment</Text>
    </View>
  );
}
