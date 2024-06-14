"use client";

import { gql, DocumentNode } from "@apollo/client";

export const SEARCH_PROFILE: DocumentNode = gql`
  query SearchProfile($userName: String!) {
    searchProfile(userName: $userName, limit: 10.0) {
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
