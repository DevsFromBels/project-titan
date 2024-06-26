import "../styles/globals.css";
import ApolloProviderClient from "@/Provider/ApolloProvider";
import useUser from "@/hooks/use-user";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useApolloClientDevTools } from "@dev-plugins/apollo-client";
import { Slot, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

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
