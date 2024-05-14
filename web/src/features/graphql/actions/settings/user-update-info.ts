import { gql } from "@apollo/client";

export const USER_UPDATE_SETTINGS = gql`
  mutation SettingsUpdateUserInfo {
    settingsUpdateUserInfo(newInfo: "Hey, I am Sergey, 19 y.o buisness man") {
      profileSettings {
        info
        isPublic
        address
        referred_users
      }
    }
  }
`;
