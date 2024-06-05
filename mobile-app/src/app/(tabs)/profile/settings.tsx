import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import ProfileSettingsWidget from "@/widgets/settings/profile-settings";
import { router } from "expo-router";
import useSettings from "@/hooks/use-settings";
import UserSettingsWidget from "@/widgets/settings/user-settings";
import { Fingerprint } from "lucide-react-native";

const settings = () => {
  const { data, loading } = useSettings();


  if(loading) {
  return <ActivityIndicator className='w-[50px] h-[50px] flex justify-center items-center' />
  }

  if (!data?.userSettings.id) {
    return router.replace("/sign-in");
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
      <View className="border rounded-xl mt-5 p-4 flex flex-col gap-2 border-white">
        <View className="flex gap-2 flex-row">
          <Fingerprint color='white' />
          <Text className='text-xl text-white'>Security</Text>
        </View>
        <View>
          <Text className='text-white text-xl'>Is Profile Public</Text>
          <View>{data?.profileSettings.isPublic ? true : false}</View>
        </View>
      </View>
    </View>
  );
};

export default settings;
