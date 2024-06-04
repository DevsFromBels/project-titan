import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]"
        options={{
          headerShadowVisible: false,
          headerTitle: "",
          headerStyle: { backgroundColor: "#121111" },
          contentStyle: { backgroundColor: "#121111" },
          headerTintColor: "white",
        }}
      />
    </Stack>
  );
};

export default _layout;
