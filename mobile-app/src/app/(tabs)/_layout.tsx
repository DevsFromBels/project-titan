import { Tabs } from "expo-router"
import { SafeAreaView } from "react-native"
import FontAwesome from "@expo/vector-icons/FontAwesome"

const TabsLayout = () => {
	return (
		<SafeAreaView className='h-screen w-screen absolute flex justify-end'>
			<Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
				<Tabs.Screen
					name='index'
					options={{
						title: "Home",
						tabBarIcon: ({ color }) => (
							<FontAwesome
								size={28}
								name='home'
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='search'
					options={{
						title: "Search",
						tabBarIcon: ({ color }) => (
							<FontAwesome
								size={28}
								name='search'
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='profile'
					options={{
						title: "Profile",
						tabBarIcon: ({ color }) => (
							<FontAwesome
								size={28}
								name='user'
								color={color}
							/>
						),
					}}
				/>
			</Tabs>
		</SafeAreaView>
	)
}

export default TabsLayout
