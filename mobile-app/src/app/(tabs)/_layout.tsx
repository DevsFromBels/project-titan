import { Link, Tabs, router } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { i18n } from "@/localization/i18n";
import { Home, Plus, CircleDollarSignIcon, Bell, Settings } from "lucide-react-native";
import { GET_SETTIGNS } from "@/graphql/actions/settings/get-settings";
import { IGetSettings } from "@/types/settings.types";
import { useQuery } from "@apollo/client";

const TabsLayout = () => {
  const { loading, data } = useQuery<IGetSettings>(GET_SETTIGNS, {
    variables: {},
  });

  return (
    <SafeAreaView className="h-screen w-screen">
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "white",
          headerShown: false,
          tabBarStyle: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            backgroundColor: "black",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: `${i18n.t("home")}`,
            tabBarIcon: ({ color }) => (
              <Home className="w-[20px] h-[20px]" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="market"
          options={{
            title: `${i18n.t("market")}`,
            tabBarIcon: ({ color }) => (
              <CircleDollarSignIcon
                className="w-[20px] h-[20px]"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            title: `${i18n.t("notification")}`,
            tabBarIcon: ({ color }) => (
              <Bell className="w-[20px] h-[20px]" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="create/[id]"
          options={{
            title: `${i18n.t("create")}`,
            tabBarIcon: ({ color }) => (
              <Plus className="w-[20px] h-[20px]" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: `${i18n.t("profile")}`,
            tabBarIcon: () => (
              <Avatar className="w-[30px] h-[30px] rounded-full">
                <AvatarImage src={`https://avatars-api.titanproject.top${data?.getSettings.avatar_url}`} />
                <AvatarFallback>
                  {data?.getSettings.userSettings.name.slice(0,2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;
