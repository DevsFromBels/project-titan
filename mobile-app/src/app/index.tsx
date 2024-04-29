import { View, Image, Pressable, Text } from "react-native"
import { router } from "expo-router"
import { i18n } from "@/localization/i18n"
import logo from "!/assets/logo.png"

export default function index() {
	return (
		<View className='bg-white dark:bg-background'>
			<View className='flex mt-[150] items-center h-screen w-screen absolute'>
				<Image
					className='absolute z-10 flex justify-center items-center ml-6'
					source={logo}
				/>
				<Text className=' text-lg items-center absolute text-dark dark:text-white z-10 flex pt-[240]'>
					Titan Advertisiment
				</Text>
			</View>
			<View className='h-screen flex justify-end pb-[40] items-center gap-5 bg-white dark:bg-background'>
				<Pressable
					className='w-[350] h-[70] bg-background dark:bg-white rounded-[15] flex justify-center items-center'
					onPress={() => router.replace("/sign-in")}
				>
					<Text className='text-2xl text-white dark:text-black'>
						{i18n.t("signin")}
					</Text>
				</Pressable>
				<Pressable
					className='w-[350] h-[70] bg-[#2638D7] rounded-[15] flex justify-center items-center'
					onPress={() => router.replace("/sign-up")}
				>
					<Text className='text-2xl text-white'>
						{i18n.t("signup")}
					</Text>
				</Pressable>
			</View>
		</View>
	)
}
