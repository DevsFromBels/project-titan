import { gql } from 'apollo-angular';

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken

      error {
        message
      }
    }
  }
`;
