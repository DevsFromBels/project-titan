import ApolloProviderClient from "@/Provider/ApolloProvider";
import { useApolloClientDevTools } from "@dev-plugins/apollo-client";
import "../styles/globals.css";
import { Slot, Stack, router } from "expo-router";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import useUser from "@/hooks/use-user";
import { useEffect, useState } from "react";

const client = new ApolloClient({
  uri: process.env.EXPO_PUBLIC_SERVER_URI,
  cache: new InMemoryCache(),
});


const Layout = () => {
  useApolloClientDevTools(client);
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/(tabs)");
    } else if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <ApolloProviderClient>
      <View className="bg-[#121111]">
        <Layout />
        <StatusBar hidden />
      </View>
    </ApolloProviderClient>
  );
}
