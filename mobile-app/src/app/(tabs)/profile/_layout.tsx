import { Drawer } from "expo-router/drawer";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const _layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShadowVisible: false,
          headerTintColor: "white",
          drawerLabelStyle: { color: "white" },
          headerTitleStyle: { color: "white" },
          drawerStyle: { backgroundColor: "#121111" },
          headerStyle: { backgroundColor: "#121111" },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Профиль",
            title: "Профиль",
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Настройки",
            title: "Настройки",
          }}
        />
        <Drawer.Screen
          name="subscription"
          options={{
            drawerLabel: "Подписки",
            title: "Подписки",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default _layout;
