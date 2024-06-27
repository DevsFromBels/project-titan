import { Skeleton } from "@/components/ui/Skeleton";
import { GET_PROFILE } from "@/graphql/actions/profile/getProfile.action";
import useUser from "@/hooks/use-user";
import ProfileSearch from "@/widgets/profile/profile-search";
import { useQuery } from "@apollo/client";
import { router, useGlobalSearchParams } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
} from "react-native";

export default function TabProfileScreen() {
  const id = useGlobalSearchParams<{ id: string }>();
  try {
    const { loading, data } = useQuery(GET_PROFILE, {
      variables: {
        userName: id.id,
      },
    });

    const { user, loading: userLoading } = useUser();

    if (loading || userLoading) {
      return <Skeleton />;
    }

    return (
      <SafeAreaView className="h-screen">
        <ScrollView className="overflow-y-auto overflow-hidden max-h-full">
          <ProfileSearch
            image={data.profile.avatar_url}
            username={data.profile.user.name}
            id={data.profile.user.id}
            info={data.profile.info}
            registerDateString={data.profile.user.createdAt}
          />
        </ScrollView>
      </SafeAreaView>
    );
  } catch (error) {
    console.error(error);
  }
}
