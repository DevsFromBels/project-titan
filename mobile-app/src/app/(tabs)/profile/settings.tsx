import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import ProfileSettingsWidget from "@/widgets/settings/profile-settings";
import { router } from "expo-router";
import useSettings from "@/hooks/use-settings";
import UserSettingsWidget from "@/widgets/settings/user-settings";
import { Fingerprint } from "lucide-react-native";
import { Button } from "@/components/ui/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const settings = () => {
  const { data, loading } = useSettings();


  if(loading) {
  return <ActivityIndicator className='w-[50px] h-[50px] flex justify-center items-center' />
  }

  if (!data?.userSettings.id) {
    return router.replace("/sign-in");
  }

  const handlelogout = async () => {
    try {
      await AsyncStorage.clear();
      router.replace("/");
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <View className="w-screen h-screen flex flex-col gap-2 bg-[#121111] text-white ">
      <ProfileSettingsWidget
        info={data.profileSettings.info}
        address={data.profileSettings.address}
      />
      <UserSettingsWidget
        name={data?.userSettings.name}
        id={data?.userSettings.id}
        email={data?.userSettings.email}
        role={data?.userSettings.role}
      />
      <View className="p-2">
        <Button variant='destructive' onPress={handlelogout} label='Выход с аккаунта' />
      </View>
      <View>
        <Button variant='destructive' onPress={handlelogout} label='Выход с аккаунта' />
      </View>
    </View>
  );
};

export default settings;
