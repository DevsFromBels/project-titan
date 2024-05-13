import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import Cookies from "js-cookie";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URI,
});

const accessToken = Cookies.get("access_token");
const refreshToken = Cookies.get("refresh_token");

console.log(accessToken)
console.log(refreshToken)

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  });

  return forward(operation);
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      !!accessToken && !!refreshToken
        ? authMiddleware.concat(httpLink)
        : httpLink,
  });
});
