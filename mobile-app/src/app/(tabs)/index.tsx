import { View, Text } from "react-native"

export default function TabHomeScreen() {
	return (
		<View className='h-screen flex items-center justify-center bg-white dark:bg-background'>
			<Text className='text-black dark:text-white flex'>Welcome</Text>
			<Text className='text-black dark:text-white flex'>
				on Titan Advertisiment
			</Text>
		</View>
	)
}
