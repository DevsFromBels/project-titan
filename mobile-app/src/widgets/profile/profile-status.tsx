import { i18n } from "@/localization/i18n";
import { Text, View } from "react-native";

interface IProfileStatusWidget {
  info: string;
}

const ProfileStatusWidget = ({ info }: IProfileStatusWidget) => {
  return (
    <View className="w-[200px] m-auto my-1 p-4 flex-1 flex-col gap-1 border border-slate-700 rounded-xl">
      {info && (
        <>
          <Text className="text-md text-white">{i18n.t("about")}</Text>
          <Text className="text-lg text-white">{info}</Text>
        </>
      )}
    </View>
  );
};

export default ProfileStatusWidget;
