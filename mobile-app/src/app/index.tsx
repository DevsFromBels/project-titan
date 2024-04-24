import { useColorScheme } from "nativewind"
import { SafeAreaView, StatusBar, Text, View } from "react-native"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { Redirect, router } from "expo-router"

export default function Tab() {
	return (
		<View className='w-screen h-screen justify-center  dark: bg-background'>
			<View className='flex justify-center items-center gap-5'>
				<Button onPress={() => router.replace('/sign-in')} label="Sign In" />
				<Button label="Sign Up" onPress={() => router.replace('/sign-up')} />
				<Button label="test" onPress={() => router.replace('/[user]')} />
			</View>
		</View>
	)
}
