import { ApolloLink } from '@apollo/client';
import Cookies from 'js-cookie';
import { graphqlClient } from '@/features/graphql/gql.setup';

const authMiddleware = new ApolloLink((operation, forward) => {
  const accessToken = Cookies.get('access_token');
  const refreshToken = Cookies.get('refresh_token');

  operation.setContext({
    headers: {
      accessToken: accessToken || null,
      refreshToken: refreshToken || null,
    },
  });

  return forward(operation);
});

export const updateTokens = () => {
  graphqlClient.setLink(authMiddleware.concat(graphqlClient.link));
};