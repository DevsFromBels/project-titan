import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { USER_UPDATE_SETTINGS_ADDRESS } from "@/graphql/actions/settings/user-update-address";
import { USER_UPDATE_SETTINGS } from "@/graphql/actions/settings/user-update-info";
import { graphqlClient } from "@/graphql/gql.setup";
import { i18n } from "@/localization/i18n";
import { useMutation } from "@apollo/client";
import { router } from "expo-router";
import { SlidersHorizontal } from "lucide-react-native";
import React, { useState } from "react";
import { View, Text } from "react-native";

interface IProfileSettingsWidget {
  info: string;
  address: string;
}

const ProfileSettingsWidget = ({ info, address }: IProfileSettingsWidget) => {
  const [editingInfo, setEditingInfo] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [tempInfo, setTempInfo] = useState(info);
  const [tempAddress, setTempAddress] = useState(address);

  const [updateUserInfo, { loading: loadingUpdateInfo, data: updatedInfo }] =
    useMutation(USER_UPDATE_SETTINGS);

  const handleSaveInfo = async () => {
    try {
      const { data } = await updateUserInfo({
        variables: {
          newInfo: tempInfo,
        },
      });
      if (data && data.settingsUpdateUserInfo) {
        setTempInfo(data.settingsUpdateUserInfo.profileSettings.info);
      }
      graphqlClient.resetStore();
    } catch (error) {
      console.error(error);
    }
    setEditingInfo(false);
  };

  const handleCancelInfo = () => {
    setTempInfo(info);
    setEditingInfo(false);
  };

  const handleEditInfo = () => {
    setEditingInfo(true);
    setTempInfo(info);
  };

  return (
    <View className="border rounded-xl mt-5 p-2 flex flex-col gap-2 border-white m-2">
      <View className="flex gap-2 flex-row">
        <SlidersHorizontal color="white" />
        <Text className="text-xl text-white">{i18n.t("block_name")}</Text>
      </View>
      <View className="flex flex-col gap-2">
        {!editingInfo &&
          updatedInfo?.settingsUpdateUserInfo?.profileSettings.info && (
            <View className="flex justify-between p-2 gap-2">
              <Text className="text-white text-xl">
                {updatedInfo.settingsUpdateUserInfo.profileSettings.info}
              </Text>
              <Button label="Изменить" onPress={handleEditInfo} />
            </View>
          )}
        {!editingInfo &&
          info &&
          !updatedInfo?.settingsUpdateUserInfo?.profileSettings.info && (
            <View className="flex justify-between p-2 gap-2">
              <Text className="text-white text-xl">{info}</Text>
              <Button label="Изменить" onPress={handleEditInfo} />
            </View>
          )}
        {editingInfo && (
          <View className="flex flex-col gap-2">
            <Input
              value={tempInfo}
              onChangeText={setTempInfo}
              style={{
                borderWidth: 1,
                borderRadius: 6,
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 4,
                paddingBottom: 4,
              }}
            />
            <Button
              label={loadingUpdateInfo ? "Saving..." : "Save"}
              onPress={() => handleSaveInfo()}
              disabled={loadingUpdateInfo}
            >
              {loadingUpdateInfo ? "Saving..." : "Save"}
            </Button>
            <Button label="Cancel" onPress={handleCancelInfo} />
          </View>
        )}
        {!editingInfo &&
          !info &&
          !updatedInfo?.settingsUpdateUserInfo?.profileSettings.info && (
            <View className="p-2">
              <Text className="text-white text-xl">{i18n.t("info")}</Text>
              <Button
                label="Добавить информацию"
                className="w-[120px] m-2"
                onPress={() => setEditingInfo(true)}
              />
            </View>
          )}
      </View>
    </View>
  );
};

export default ProfileSettingsWidget;
