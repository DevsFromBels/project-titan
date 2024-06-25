import { USER_UPDATE_SETTINGS_ADDRESS } from "@/features/graphql/actions/settings/user-update-address";
import { USER_UPDATE_SETTINGS } from "@/features/graphql/actions/settings/user-update-info";
import { graphqlClient } from "@/features/graphql/client/gql.setup";
import { Button } from "@/shared/components/ui/button";
import { SelectItem } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import Cookies from "js-cookie";

interface IProfileSettingsWidget {
  info: string;
  address: string;
}

const ProfileSettingsWidget = ({ info, address }: IProfileSettingsWidget) => {
  const [editingInfo, setEditingInfo] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [tempInfo, setTempInfo] = useState(info);
  const [tempAddress, setTempAddress] = useState(address);

  const [
    updateUserAddress,
    { loading: loadingUpdateAddress, data: updatedAddress },
  ] = useMutation(USER_UPDATE_SETTINGS_ADDRESS);

  const settingsProfileTranslation = useTranslations("pages.settings-page");

  const [updateUserInfo, { loading: loadingUpdateInfo, data: updatedInfo }] =
    useMutation(USER_UPDATE_SETTINGS);

  const handleInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTempInfo(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempAddress(e.target.value);
  };

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

  const handleSaveAddress = async () => {
    try {
      const { data } = await updateUserAddress({
        variables: {
          address: tempAddress,
        },
      });
      if (data && data.settingsUpdateUserAddress) {
        setTempAddress(data.settingsUpdateUserAddress.profileSettings.address);
      }
      console.log(data);
      graphqlClient.resetStore();
    } catch (error) {
      console.error(error);
    }
    setEditingAddress(false);
  };

  const handleCancelInfo = () => {
    setTempInfo(info);
    setEditingInfo(false);
  };

  const handleCancelAddress = () => {
    setTempAddress(address);
    setEditingAddress(false);
  };

  const handleEditInfo = () => {
    setEditingInfo(true);
    setTempInfo(info);
  };

  const handleEditAddress = () => {
    setEditingAddress(true);
    setTempAddress(address);
  };

  const handleLogout = async () => {
    try {
      Cookies.remove("access_token", {
        domain: 'localhost'
      });
      Cookies.remove("refresh_token", {
        domain: 'localhost'
      });

      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border rounded-xl mt-5 p-4 flex flex-col gap-2">
      <div className="flex gap-1">
        <SlidersHorizontal />
        <h1>{settingsProfileTranslation("profile-settings.block-name")}</h1>
      </div>
      <div className="flex flex-col gap-2">
        <span>{settingsProfileTranslation("profile-settings.info")}</span>
        {!editingInfo &&
          updatedInfo?.settingsUpdateUserInfo?.profileSettings.info && (
            <div className="flex justify-between">
              <p>{updatedInfo.settingsUpdateUserInfo.profileSettings.info}</p>
              <Button variant="outline" onClick={handleEditInfo}>
                Edit
              </Button>
            </div>
          )}
        {!editingInfo &&
          info &&
          !updatedInfo?.settingsUpdateUserInfo?.profileSettings.info && (
            <div className="flex justify-between">
              <p className="text-lg">{info}</p>
              <Button variant="outline" onClick={handleEditInfo}>
                Edit
              </Button>
            </div>
          )}
        {editingInfo && (
          <div className="flex flex-col gap-2">
            <Textarea
              // type="text"
              value={tempInfo}
              onChange={handleInfoChange}
              className="border rounded-md px-2 py-1 resize-none text-lg"
            />
            <Button
              variant="outline"
              onClick={() => handleSaveInfo()}
              disabled={loadingUpdateInfo}
            >
              {loadingUpdateInfo ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" onClick={handleCancelInfo}>
              Cancel
            </Button>
          </div>
        )}
        {!editingInfo &&
          !info &&
          !updatedInfo?.settingsUpdateUserInfo?.profileSettings.info && (
            <Button
              variant="outline"
              className="w-[120px]"
              onClick={() => setEditingInfo(true)}
            >
              Add info
            </Button>
          )}
      </div>
      <div>
        <Button onClick={handleLogout} variant="destructive">
          Выйти с аккаунта
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettingsWidget;
