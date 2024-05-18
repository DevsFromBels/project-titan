import { Input } from "@/components/ui/Input"
import { REGISTER_USER } from "@/graphql/actions/register.action"
import { i18n } from "@/localization/i18n"
import { useMutation } from "@apollo/client"
import { router } from "expo-router"
import React, { useCallback, useState } from "react"
import { View, Text, TouchableOpacity, Pressable } from "react-native"
import { ACTIVATE_USER } from "@/graphql/actions/activation.action"
import { LOGIN_USER } from "@/graphql/actions/login.action"
import AsyncStorage from "@react-native-async-storage/async-storage"

const index = () => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [errorNot, setErrorNot] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [usernameError, setUsernameError] = useState("")
	const [emailError, setEmailError] = useState("")
	const [passwordError, setPasswordError] = useState("")
	const [activationToken, setActivationToken] = useState("")
	const [otp, setOtp] = useState("")
	const [showOTPInput, setShowOTPInput] = useState(false)

	const [register, { data, loading, error }] = useMutation(REGISTER_USER)
	const [activateUser] = useMutation(ACTIVATE_USER)
	const [login] = useMutation(LOGIN_USER)

	const registerHandler = useCallback(
		async (name: string, email: string, password: string) => {
			if (
				name.trim().length === 0 ||
				email.trim().length === 0 ||
				password.trim().length === 0
			) {
				if (email.trim().length === 0) {
					setEmailError("Email is required")
					setErrorNot("Email is required")
					setPasswordError(" ")
					setUsernameError(" ")
				} else if (password.trim().length === 0) {
					setPasswordError("Password is required")
					setErrorNot("Password is required")
					setUsernameError(" ")
					setEmailError(" ")
				} else if (name.trim().length === 0) {
					setEmailError("Email is required")
					setErrorNot("Email is required")
					setPasswordError(" ")
					setUsernameError(" ")
				}
				return
			}
			setIsLoading(true)
			setUsernameError("")
			setPasswordError("")
			setEmailError("")
			setShowOTPInput(false)

			try {
				const { data } = await register({
					variables: {
						name: name,
						email: email.toLowerCase(),
						password: password,
					},
				})
				setActivationToken(data.register.activation_token)
				setIsLoading(false)
			} catch (err) {
				console.error(err)
				setErrorNot("An error occurred. Please try again.")
				setIsLoading(false)
			}
		},
		[]
	)

	const handleSignUpPress = useCallback(() => {
		registerHandler(name, email, password)
		if (
			name.trim().length === 0 ||
			email.trim().length === 0 ||
			password.trim().length === 0
		) {
			if (email.trim().length === 0) {
				setEmailError("Email is required")
				setErrorNot("Email is required")
				setPasswordError(" ")
				setUsernameError(" ")
				setShowOTPInput(false)
			} else if (password.trim().length === 0) {
				setPasswordError("Password is required")
				setErrorNot("Password is required")
				setUsernameError(" ")
				setEmailError(" ")
				setShowOTPInput(false)
			} else if (name.trim().length === 0) {
				setEmailError("Email is required")
				setErrorNot("Email is required")
				setPasswordError(" ")
				setUsernameError(" ")
				setShowOTPInput(false)
			}
			return
		}
		setShowOTPInput(true)
	}, [name, email, password, registerHandler])

	const verifyOTPHandler = async () => {
		if (!activationToken) return
		const { data } = await activateUser({
			variables: {
				activationToken: activationToken,
				activationCode: otp,
			},
		})

		const { data: dataLogin } = await login({
			variables: {
				email: email.toLowerCase(),
				password: password,
			},
		})
		await AsyncStorage.setItem("access_token", dataLogin.login.accessToken)
		await AsyncStorage.setItem(
			"refresh_token",
			dataLogin.login.refreshToken
		)
		router.replace("/(tabs)")
	}

	if (loading) {
		return (
			<View className='h-screen bg-background flex justify-center items-center'>
				<Text className='text-white'>Loading ...</Text>
			</View>
		)
	}

	return (
		<View className='bg-background h-screen w-screen'>
			{showOTPInput && (
				<View className='bg-background h-screen w-screen flex justify-center items-center mt-4 absolute z-10'>
					<Input
						className='w-[350]'
						placeholder='Code...'
						value={otp}
						onChangeText={setOtp}
					/>
					<Pressable
						className='w-[350] h-[70] rounded-[15] flex justify-center items-center bg-white mt-4'
						onPress={verifyOTPHandler}
					>
						<Text className='text-2xl text-black'>
							Verify OTP
						</Text>
					</Pressable>
				</View>
			)}
			<View className='w-[40] bg-background'>
				<TouchableOpacity onPress={() => router.replace("/")}>
					<Text className='text-6xl color-white'>
						←
					</Text>
				</TouchableOpacity>
			</View>
			<View className='bg-background flex justify-center gap-2 items-center h-screen pb-[150]'>
				<Text className='text-white flex flex-col mt-10 text-3xl text-center'>
					{i18n.t("signup")}
				</Text>
				{errorNot && (
					<Text className='text-red-500  text-2xl'>{errorNot}</Text>
				)}
				<Input
					className='w-[350]'
					placeholder='Name'
					value={name}
					onChangeText={setName}
				/>
				<Input
					className='w-[350]'
					placeholder='Email'
					value={email}
					onChangeText={setEmail}
				/>
				<Input
					className='w-[350]'
					placeholder='Password'
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
			</View>
			<View className='flex justify-end items-center pb-5 absolute h-screen w-screen'>
				<Pressable
					className='w-[350] h-[70] rounded-[15] flex justify-center items-center bg-white'
					onPress={handleSignUpPress}
				>
					<Text className='text-2xl text-black'>
						{i18n.t("signup")}
					</Text>
				</Pressable>
			</View>
		</View>
	)
}
export default index
