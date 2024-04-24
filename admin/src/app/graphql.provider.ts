import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

const uri = 'https://core.titanproject.top/graphql';

export function apolloOptionsFactory(): ApolloClientOptions<any> {
  const httpLink = inject(HttpLink);
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  let link: ApolloLink;

  if (accessToken && refreshToken) {
    const authMiddleware = setContext(() => ({
      headers: {
        accessToken,
        refreshToken,
      },
    }));

    link = ApolloLink.from([authMiddleware, httpLink.create({ uri })]);
  } else {
    link = httpLink.create({ uri });
  }

  return {
    link,
    cache: new InMemoryCache(),
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];
