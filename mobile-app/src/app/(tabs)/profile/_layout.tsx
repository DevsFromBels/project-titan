import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

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
          drawerPosition: 'right',
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Profile",
            title: "Profile",
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "Settings",
          }}
        />
        <Drawer.Screen
          name="notification"
          options={{
            drawerLabel: "Notification",
            title: "Notification",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default _layout;
