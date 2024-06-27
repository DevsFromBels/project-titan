import { Stack } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]"
        options={{
          headerShadowVisible: false,
          headerShown: false,
          headerStyle: { backgroundColor: "#121111" },
          contentStyle: { backgroundColor: "#121111" },
          headerTintColor: "white",
        }}
      />
    </Stack>
  );
};

export default _layout;
