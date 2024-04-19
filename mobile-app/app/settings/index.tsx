import { useColorScheme } from "nativewind"
import { SafeAreaView, ScrollView, StatusBar, Switch, Text } from "react-native"

export default function App() {
    const { colorScheme, toggleColorScheme} = useColorScheme()
	return (
		<SafeAreaView className='w-screen h-screen flex justify-center items-center dark:bg-neutral-900'>
            <StatusBar style={colorScheme== 'dark' ? 'light' : 'dark'}/>
            <Switch value={colorScheme=='dark'} onChange={toggleColorScheme}/>
			<Text className='dark:text-white'>popo</Text>
		</SafeAreaView>
	)
}