import { gql } from 'apollo-angular';

export const GetAllUsersProfiles = gql`
  query GetAllUsersProfiles {
    getAllUsersProfiles(limit: "20", page: 0) {
      users {
        id
        name
        email
        password
        role
        createdAt
      }
    }
  }
`;
