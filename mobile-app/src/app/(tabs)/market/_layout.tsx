import { Stack } from "expo-router";
import React from "react";
import { BaseAnimationBuilder } from "react-native-reanimated";

const _layout = () => {
  return (
    <Stack initialRouteName="Home" screenOptions={{ unmountOnBlur: true }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]"
        options={{
          headerShadowVisible: false,
          headerTitle: "",
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
