"use client";

import { gql, DocumentNode } from "@apollo/client";

export const GET_PROFILE: DocumentNode = gql`
  query Profile($userName: String!) {
    profile(userName: $userName) {
      user {
        id
        name
        email
        role
        createdAt
      }
      avatar_url
      info
      isPublic
    }
  }
`;
