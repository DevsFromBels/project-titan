import { Tabs } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { i18n } from "@/localization/i18n";
import { Home, Plus, CircleDollarSignIcon, Menu, User } from "lucide-react-native";
import { GET_SETTIGNS } from "@/graphql/actions/settings/get-settings";
import { IGetSettings } from "@/types/settings.types";
import { useQuery } from "@apollo/client";

const TabsLayout = () => {
  const { loading, data } = useQuery<IGetSettings>(GET_SETTIGNS, {
    variables: {},
  });

  return (
    <SafeAreaView className="h-full w-screen">
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
          name="menu"
          options={{
            title: `${i18n.t("menu")}`,
            tabBarIcon: ({ color }) => (
              <Menu className="w-[20px] h-[20px]" color={color} />
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
          name="profile/index"
          options={{
            title: `${i18n.t("profile")}`,
            tabBarIcon: () => (
              <Avatar className="w-[30px] h-[30px] rounded-full">
                <AvatarFallback>
                  {data?.getSettings.userSettings.name?.slice(0, 2).toUpperCase() || "SH"}
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
