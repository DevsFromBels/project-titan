import { gql } from "@apollo/client";

export const USER_UPDATE_SETTINGS_ADDRESS = gql`
  mutation SettingsUpdateUserAddress($address: String!) {
    settingsUpdateUserAddress(address: $address) {
      profileSettings {
        info
        isPublic
        address
        referred_users
      }
    }
  }
`;
