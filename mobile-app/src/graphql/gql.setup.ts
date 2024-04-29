import {
	ApolloClient,
	InMemoryCache,
	ApolloLink,
	createHttpLink,
	Observable,
} from "@apollo/client"
import AsyncStorage from "@react-native-async-storage/async-storage"

const httpLink = createHttpLink({
	uri: process.env.EXPO_PUBLIC_SERVER_URI,
})

const access_token = AsyncStorage.getItem("access_token")
const refresh_token = AsyncStorage.getItem("refresh_token")

const getTokens = async () => {
	const accessToken = await AsyncStorage.getItem("access_token")
	const refreshToken = await AsyncStorage.getItem("refresh_token")

	return { accessToken, refreshToken }
}

const authMiddleware = new ApolloLink((operation, forward) => {
	return new Observable((observer) => {
		getTokens()
			.then(({ accessToken, refreshToken }) => {
				operation.setContext({
					headers: {
						accessToken: accessToken || "",
						refreshToken: refreshToken || "",
					},
				})

				forward(operation).subscribe({
					next: observer.next.bind(observer),
					error: observer.error.bind(observer),
					complete: observer.complete.bind(observer),
				})
			})
			.catch(observer.error.bind(observer))
	})
})

export const graphqlClient = new ApolloClient({
	link:
		!!access_token && !!refresh_token
			? authMiddleware.concat(httpLink)
			: httpLink,
	cache: new InMemoryCache(),
})
