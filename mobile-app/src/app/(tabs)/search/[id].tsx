import { Skeleton } from "@/components/ui/Skeleton";
import { GET_PROFILE } from "@/graphql/actions/profile/getProfile.action";
import { GET_SETTIGNS } from "@/graphql/actions/settings/get-settings";
import { IUseProfile } from "@/hooks/use-profile";
import useUser from "@/hooks/use-user";
import { IGetSettings } from "@/types/settings.types";
import ProfileMainBlockWidget from "@/widgets/profile/profile-main-block";
import { useQuery } from "@apollo/client";
import { router, useGlobalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView, View, Text, Image, ScrollView } from "react-native";

export default function TabProfileScreen() {
  const id = useGlobalSearchParams<{ id: string }>();
  try {
    const { loading, data } = useQuery(GET_PROFILE, {
      variables: {
        userName: id,
      },
    });

    const { user, loading: userLoading } = useUser();

    if (loading || userLoading) {
      return <Skeleton />;
    }

    return (
      <SafeAreaView className="h-screen">
        <ScrollView className="overflow-y-auto overflow-hidden max-h-full">
          <ProfileMainBlockWidget
            image={data.profile.avatar_url}
            username={data.profile.userSettings.name}
            id={data.profile.userSettings.id}
            info={data.profile.profileSettings.info}
            registerDateString={data.profile.userSettings.createdAt}
          />
        </ScrollView>
      </SafeAreaView>
    );
  } catch (error) {
    console.error(error);
  }
}
