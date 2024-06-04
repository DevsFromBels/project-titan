import { USER_UPDATE_SETTINGS_ADDRESS } from "@/graphql/actions/settings/user-update-address";
import { USER_UPDATE_SETTINGS } from "@/graphql/actions/settings/user-update-info";
import { graphqlClient } from "@/graphql/gql.setup";
import { Button } from "@/components/ui/Button";
import { useMutation } from "@apollo/client";
import { SlidersHorizontal } from "lucide-react-native";
import React, { useState } from "react";
import { i18n } from "@/localization/i18n";
import { View, Text } from "react-native";
import { Input } from "@/components/ui/Input";

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
    <View className="border rounded-xl mt-5 p-4 flex flex-col gap-2 border-white">
      <View className="flex gap-2 flex-row">
        <SlidersHorizontal color="white" />
        <Text className="text-xl text-white">{i18n.t("block_name")}</Text>
      </View>
      <View className="flex flex-col gap-2">
        {!editingInfo &&
          updatedInfo?.settingsUpdateUserInfo?.profileSettings.info && (
            <View className="flex justify-between">
              <Text className="text-white">
                {updatedInfo.settingsUpdateUserInfo.profileSettings.info}
              </Text>
              <Button label="Edit" onPress={handleEditInfo} />
            </View>
          )}
        {!editingInfo &&
          info &&
          !updatedInfo?.settingsUpdateUserInfo?.profileSettings.info && (
            <View className="flex justify-between">
              <Text className="text-white">{info}</Text>
              <Button label="Edit" onPress={handleEditInfo} />
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
            <View>
              <Text className="text-white text-xl">{i18n.t("info")}</Text>
              <Button
                label="Add info"
                className="w-[120px]"
                onPress={() => setEditingInfo(true)}
              />
            </View>
          )}
      </View>
    </View>
  );
};

export default ProfileSettingsWidget;
