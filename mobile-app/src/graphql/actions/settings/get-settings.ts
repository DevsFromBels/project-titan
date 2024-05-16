import { gql } from "@apollo/client";

export const GET_SETTIGNS = gql`
  query GetSettings {
    getSettings {
      userSettings {
        id
        name
        email
        password
        role
        createdAt
      }
      profileSettings {
        info
        isPublic
        address
        referred_users
      }
      avatar_url
    }
  }
`;
