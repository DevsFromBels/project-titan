import { Skeleton } from "@/components/ui/Skeleton";
import useUser from "@/hooks/use-user";
import { router } from "expo-router";
import { DiamondMinus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";

type SubscriptionItem = {
  content_id: string;
  content: string;
  name: string;
  link: string;
  user_id: string;
  price_for_show: number;
  total_shows: number;
  current_shows: number;
  category: string;
};

const Notification = () => {
  const { user, loading } = useUser();
  const [subs, setSubs] = useState<SubscriptionItem[]>([]);
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      const fetchSubscriptions = async () => {
        const response = await fetch(
          `https://market-api.titanproject.top/get-user-subscriptions?token=${user.id}`
        );
        const data = await response.json();
        setSubs(data);
        setPostLoading(false);
        console.log(data);
      };

      fetchSubscriptions();
    }
  }, [user?.id]);

  if (loading || !user || postLoading) {
    return <Skeleton />;
  }

  if (!subs.length) {
    return (
      <View className="flex flex-col justify-center items-center bg-[#121111] h-screen gap-2">
        <DiamondMinus size='90' color={"white"} />
        <Text className="text-white font-bold text-2xl">
          У вас пока нет подписок.
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-[#121111] h-full w-screen flex justify-center items-center">
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {subs.map((e) => (
          <React.Fragment key={e.content_id}>
            <Pressable
              onPress={() => router.replace(`/(tabs)/market/${e.content_id}`)}
              style={{ width: "48%" }}
            >
              <View
                style={{
                  position: "relative",
                  width: "100%",
                  height: 200,
                  marginBottom: 10,
                }}
                className="rounded-xl grid grid-cols-2"
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                  }}
                  className="rounded-xl"
                  source={{
                    uri: `https://market-api.titanproject.top${e.content}`,
                  }}
                  onError={() => console.log("Image error")}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    padding: 10,
                  }}
                  className="rounded-xl"
                >
                  <Text style={{ color: "#fff", fontSize: 16 }}>{e.name}</Text>
                  <Text style={{ color: "#fff", fontSize: 14 }}>
                    Осталось показов: {e.current_shows} / {e.total_shows}
                  </Text>
                </View>
              </View>
            </Pressable>
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

export default Notification;
