import { Skeleton } from "@/components/ui/Skeleton";
import { GET_SETTIGNS } from "@/graphql/actions/settings/get-settings";
import { IGetSettings } from "@/types/settings.types";
import ProfileMainBlockWidget from "@/widgets/profile/profile-main-block";
import ProfileStatusWidget from "@/widgets/profile/profile-status";
import { useQuery } from "@apollo/client";
import { router } from "expo-router";
import { SafeAreaView } from "react-native";

export default function TabProfileScreen() {
  try {
    const { loading, data } = useQuery<IGetSettings>(GET_SETTIGNS, {
      variables: {},
    });

    if (loading) {
      return <Skeleton />;
    }

    if (!data?.getSettings.userSettings.id) {
      return router.replace('/')
    }

    return (
      <SafeAreaView className='h-screen'>
        <ProfileMainBlockWidget
          image={data.getSettings.avatar_url}
          username={data.getSettings.userSettings.name}
          id={data.getSettings.userSettings.id}
          info={data.getSettings.profileSettings.info}
        />
      </SafeAreaView>
    );
  } catch (error) {
    console.error(error);
  }
}
