import { useColorScheme } from "nativewind"
import { SafeAreaView, Text, View } from "react-native"
import { Input } from "../components/Input"
import { Button } from "../components/Button"

export default function App() {
	const { colorScheme, toggleColorScheme } = useColorScheme()
	return (
		<SafeAreaView className='w-screen h-full flex justify-center items-center dark: bg-background'>
			
		</SafeAreaView>
	)
}
