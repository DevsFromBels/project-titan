"use client"
import React from "react"
import { ApolloProvider } from "@apollo/client"
import { graphqlClient } from "@/graphql/gql.setup"

interface IApolloProvider extends React.HTMLAttributes<HTMLDivElement> {}

const ApolloProviderClient = ({ children }: IApolloProvider) => {
	return <ApolloProvider client={graphqlClient}>{children}</ApolloProvider>
}
export default ApolloProviderClient
