import { useMutation } from "@apollo/client"
import { LOGIN_USER } from "../../../graphql/actions/login.action"
import { useState, useCallback } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Input } from "../../../components/Input"
import { View, Text, TouchableOpacity, Pressable } from "react-native"
import { router } from "expo-router"
import { SafeAreaView } from "react-native"
import { i18n } from "@/localization/i18n"

const SignInPage = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [errorNot, setErrorNot] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [usernameError, setUsernameError] = useState("")
	const [passwordError, setPasswordError] = useState("")

	const back = "!/assets/back.png"
	const [login, { data, loading, error }] = useMutation(LOGIN_USER)

	const loginHandler = useCallback(
		async (email: string, password: string) => {
			if (email.trim().length === 0 || password.trim().length === 0) {
				if (email.trim().length === 0) {
					setUsernameError("Email is required")
					setErrorNot("Email is required")
					setPasswordError(" ")
				} else if (password.trim().length === 0) {
					setPasswordError("Password is required")
					setErrorNot("Password is required")
					setUsernameError(" ")
				}
				return
			}
			setIsLoading(true)
			setUsernameError("")
			setPasswordError("")

			try {
				const { data } = await login({
					variables: {
						email: email.toLowerCase(),
						password: password,
					},
				})
				await AsyncStorage.setItem(
					"access_token",
					data.login.accessToken
				)
				await AsyncStorage.setItem(
					"refresh_token",
					data.login.refreshToken
				)
				router.replace('/home')
				setIsLoading(false)
			} catch (err) {
				setErrorNot("An error occurred. Please try again.")
				setIsLoading(false)
			}
		},
		[]
	)

	if (loading) {
		return (
			<View className='h-screen dark: bg-background flex justify-center items-center'>
				<Text>Loading ...</Text>
			</View>
		)
	}

	return (
		<SafeAreaView className='h-screen'>
			<View className='w-[40] bg-white dark:bg-background'>
				<TouchableOpacity onPress={() => router.replace("/")}>
					<Text className='text-6xl color-black dark:color-white'>
						←
					</Text>
				</TouchableOpacity>
			</View>

			<View className='flex items-center justify-center pb-[200] gap-3 w-screen h-screen bg-white dark:bg-background'>
				<Text className='text-dark dark:text-white flex flex-col mt-10 text-3xl text-center'>
					{i18n.t("signin")}
				</Text>
				{errorNot && (
					<Text className='dark: text-red-500'>{errorNot}</Text>
				)}
				<Input
					className='w-[350]'
					placeholder='Email'
					value={email}
					onChangeText={setEmail}
				/>
				<Input
					className='w-[350]'
					placeholder='Password'
					value={password}
					secureTextEntry={true}
					onChangeText={setPassword}
				/>
			</View>
			<View className='flex justify-end items-center pb-5 absolute h-screen w-screen'>
				<Pressable
					className='w-[350] h-[70] rounded-[15] flex justify-center items-center bg-black dark:bg-white'
					onPress={() => loginHandler(email, password)}
				>
					<Text className='text-2xl text-white dark:text-black'>
						{i18n.t("signin")}
					</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	)
}

export default SignInPage