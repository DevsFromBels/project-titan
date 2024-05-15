import { gql } from "@apollo/client";

export const USER_UPDATE_SETTINGS = gql`
  mutation SettingsUpdateUserInfo($newInfo: String!) {
    settingsUpdateUserInfo(newInfo: $newInfo) {
      profileSettings {
        info
        isPublic
        address
        referred_users
      }
    }
  }
`;
