import { Button } from "@/components/Button"
import { LOGOUT_USER } from "@/graphql/actions/logout.action"
import { graphqlClient } from "@/graphql/gql.setup"
import { useQuery } from "@apollo/client"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { useState } from "react"
import { View, Text, Alert } from "react-native"

export default function TabProfileScreen() {
	const [messageError, setMessageError] = useState("")
	const [message, setMessage] = useState("")

	const logoutPress = async () => {
		try {
			const data = await graphqlClient.query({
				query: LOGOUT_USER,
				variables: {},
			})
			console.log(data)
			await AsyncStorage.removeItem("access_token")
			await AsyncStorage.removeItem("refresh_token")
			setMessage("Вы вышли из аккаунта")
			router.replace('/')
		} catch (error) {
			setMessageError("Какая-то ошибка")
		}
	}
	return (
		<View className='flex-1 justify-center items-center h-screen w-screen bg-white dark:bg-background'>
			<Text className='text-black dark:text-white'>Tab Profile</Text>
			{message && (
				<Text className='flex justify-center items-center text-black dark:text-white'>
					{message}
				</Text>
			)}
			{messageError && (
				<Text className='flex justify-center items-center text-black dark:text-white'>
					{messageError}
				</Text>
			)}
			<Button
				label='Log Out'
				onPress={() => logoutPress}
			/>
		</View>
	)
}
