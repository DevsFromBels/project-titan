"use client";

import {
  ApolloLink,
  HttpLink,
} from "@apollo/client";

import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

import Cookies from 'js-cookie';

function makeClient() {
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");

  // console.log(accessToken);
  // console.log(refreshToken);
  

  const httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_SERVER_URI,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  
    return forward(operation);
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            !!accessToken && !!refreshToken
            ? authMiddleware.concat(httpLink)
            : httpLink,
          ])
        : !!accessToken && !!refreshToken
          ? authMiddleware.concat(httpLink)
          : httpLink,
  });
}

export function ApolloWrapperServer({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}