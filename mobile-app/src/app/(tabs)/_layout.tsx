import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { GET_SETTIGNS } from "@/graphql/actions/settings/get-settings";
import { i18n } from "@/localization/i18n";
import { IGetSettings } from "@/types/settings.types";
import { useQuery } from "@apollo/client";
import { Link, Tabs, router } from "expo-router";
import {
  Home,
  Plus,
  CircleDollarSignIcon,
  Bell,
  Settings,
  Search,
} from "lucide-react-native";
import { SafeAreaView, Text } from "react-native";

const TabsLayout = () => {
  const { loading, data } = useQuery<IGetSettings>(GET_SETTIGNS, {
    variables: {},
  });

  let profileImage = `https://avatars-api.titanproject.top${data?.getSettings.avatar_url}`;

  if (!data?.getSettings.avatar_url) {
    profileImage = "https://titanproject.top/cat.jpeg";
  }

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
            backgroundColor: "#100F0F",
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
          name="search"
          options={{
            title: `${i18n.t("search")}`,
            tabBarIcon: ({ color }) => (
              <Search className="w-[20px] h-[20px]" color={color} />
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
                <AvatarImage src={profileImage} width={30} height={30} />
                <AvatarFallback>
                  {data?.getSettings.userSettings.name
                    .slice(0, 2)
                    .toUpperCase()}
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
