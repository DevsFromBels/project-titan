import { SafeAreaView, ScrollView, Text } from "react-native"
import "../../styles/globals.css"
import {
	ThemeProvider,
	DarkTheme,
	DefaultTheme,
	useTheme,
} from "@react-navigation/native"

export default function App() {
	return (
		<ThemeProvider value={DarkTheme}>
			<SafeAreaView className='w-screen h-screen flex justify-center items-center'>
				<Text>popo</Text>
			</SafeAreaView>
		</ThemeProvider>
	)
}
