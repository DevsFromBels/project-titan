import { gql } from 'apollo-angular';

export const getProfileQuery = gql`
  query Profile($userName: String!) {
      profile(userName: $userName) {
        user {
          id
          name
          email
          role
          createdAt
        }
        info
        isPublic
        avatar_url
      }
    }
`;
