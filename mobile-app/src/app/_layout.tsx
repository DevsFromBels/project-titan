import ApolloProviderClient from "@/Provider/ApolloProvider"
import { useApolloClientDevTools } from "@dev-plugins/apollo-client"
import "../styles/globals.css"
import { Slot } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
	uri: process.env.NEXT_PUBLIC_SERVER_URI,
	cache: new InMemoryCache(),
})


export default function RootLayout() {
	useApolloClientDevTools(client)
	return (
		<SafeAreaView className='w-screen h-screen'>
			<ApolloProviderClient>
				<Slot />
			</ApolloProviderClient>
		</SafeAreaView>
	)
}
