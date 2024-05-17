import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, Stack, router } from "expo-router";
import { MoveLeft, Settings } from "lucide-react-native";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerRight: ({ tintColor }) => (
            <View>
              <TouchableOpacity
                onPress={() => router.replace("profile/settings")}
              >
                <Settings color={tintColor} />
              </TouchableOpacity>
            </View>
          ),
          headerShown: true,
          headerTitle: "Profile",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen name="settings" options={{
        headerTitle: '',
        headerLeft: ({tintColor}) => (
            <TouchableOpacity
              onPress={() => router.replace('profile')}
            >
              <MoveLeft color={tintColor}/>
            </TouchableOpacity>
        ),
        headerShadowVisible: false,
        headerStyle: {
            backgroundColor: 'black',
        },
        headerTintColor: 'white'
      }} />
    </Stack>
  );
};

export default _layout;
