import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { MoveLeft } from "lucide-react-native";
import { Input } from "@/components/ui/Input";

const index = () => {
  const [email, setEmail] = useState("");
  return (
    <View className="bg-[#121111] w-screen h-full">
      <View className="w-[40] bg-[#121111] m-5">
        <TouchableOpacity onPress={() => router.replace("/")}>
          <MoveLeft color="white" />
        </TouchableOpacity>
      </View>
      <View className='flex justify-center items-center h-full gap-5'>
        <Text className="text-white text-xl text-center">
          Если вы забыли свой пароль, пожалуйста укажите почту от вашего
          аккаунта
        </Text>
        <Input
          className="w-[350]"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity
          className="w-[350] h-[70] rounded-[15] flex justify-center items-center bg-white mt-10"
        >
          <Text className="text-2xl text-black">Отправить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;
