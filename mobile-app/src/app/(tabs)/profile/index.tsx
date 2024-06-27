import { Skeleton } from "@/components/ui/Skeleton";
import { GET_SETTIGNS } from "@/graphql/actions/settings/get-settings";
import { IGetSettings } from "@/types/settings.types";
import ProfileMainBlockWidget from "@/widgets/profile/profile-main-block";
import { useQuery } from "@apollo/client";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView, View, Text, Image, ScrollView } from "react-native";

const TabProfileScreen = () => {
  try {
    const { loading, data } = useQuery<IGetSettings>(GET_SETTIGNS, {
      variables: {},
    });

    if (loading) {
      return <Skeleton />;
    }

    if (!data?.getSettings.userSettings.id) {
      return router.replace("/");
    }

    return (
      <SafeAreaView className="h-screen">
        <ScrollView className="h-screen">
          <ProfileMainBlockWidget
            image={data.getSettings.avatar_url}
            username={data.getSettings.userSettings.name}
            id={data.getSettings.userSettings.id}
            info={data.getSettings.profileSettings.info}
            registerDateString={data.getSettings.userSettings.createdAt}
          />
        </ScrollView>
      </SafeAreaView>
    );
  } catch (error) {
    console.error(error);
  }
};

export default TabProfileScreen;
