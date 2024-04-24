import useUser from "@/hooks/use-user"
import React from "react"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const index = () => {
	const user = useUser()
	return (
		<SafeAreaView className='dark: bg-background flex justify-center items-center h-screen'>
			<Text>Welcome {user.user?.name}</Text>
			<Text>on Titan Advertisiment</Text>
		</SafeAreaView>
	)
}

export default index
