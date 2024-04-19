import {
	ApolloClient,
	InMemoryCache,
	ApolloLink,
	createHttpLink,
} from "@apollo/client"
import Cookies from "js-cookie"

const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_SERVER_URI,
})

const accessToken = Cookies.get("access_token")
const refreshToken = Cookies.get("refresh_token")

const authMiddleware = new ApolloLink((operation, forward) => {
	operation.setContext({
		headers: {
			accessToken: accessToken,
			refreshToken: refreshToken,
		},
	})

	return forward(operation)
})

export const graphqlClient = new ApolloClient({
	link:
		!!accessToken && !!refreshToken
			? authMiddleware.concat(httpLink)
			: httpLink,
	cache: new InMemoryCache(),
})
