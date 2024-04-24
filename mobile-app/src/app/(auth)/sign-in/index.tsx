import { useMutation } from "@apollo/client"
import { LOGIN_USER } from "../../../graphql/actions/login.action"
import { useState, useCallback } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Input } from "../../../components/Input"
import { Button } from "../../../components/Button"
import { View, Text } from "react-native"
import { router } from "expo-router"
import useUser from "@/hooks/use-user"

const SignInPage = () => {
	const user = useUser()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [errorNot, setErrorNot] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [usernameError, setUsernameError] = useState("")
	const [passwordError, setPasswordError] = useState("")

	const [login, { data, loading, error }] = useMutation(LOGIN_USER)

	const loginHandler = useCallback(
		async (email: string, password: string) => {
			if (email.trim().length === 0 || password.trim().length === 0) {
				if (email.trim().length === 0) {
					setUsernameError("Username is required")
					setErrorNot("Username is required")
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
				router.replace(`/${user.user?.name}`)
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
		<View className='dark: bg-background'>
			<View className='flex items-center justify-center gap-3 w-screen h-screen'>
				<Text className='text-white flex flex-col mt-10 text-xl text-center'>
					Sign up
				</Text>
				{errorNot && (
					<Text className='dark: text-red-500'>{errorNot}</Text>
				)}
				<Input
					className='w-[250] dark: text-white'
					placeholder='email'
					value={email}
					onChangeText={setEmail}
				/>
				<Input
					className='w-[250] dark: text-white'
					placeholder='password'
					value={password}
					secureTextEntry={true}
					onChangeText={setPassword}
				/>
				<Button
					onPress={() => loginHandler(email, password)}
					label='Sign In'
				/>
			</View>
		</View>
	)
}

export default SignInPage
