import { Input } from "@/components/ui/Input";
import { REGISTER_USER } from "@/graphql/actions/register.action";
import { i18n } from "@/localization/i18n";
import { useMutation } from "@apollo/client";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { ACTIVATE_USER } from "@/graphql/actions/activation.action";
import { LOGIN_USER } from "@/graphql/actions/login.action";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MoveLeft } from "lucide-react-native";
import { OtpInput } from "react-native-otp-entry";

const index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorNot, setErrorNot] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otp, setOtp] = useState("");
  const [activationToken, setActivationToken] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);

  const [register, { data, loading, error }] = useMutation(REGISTER_USER);
  const [activateUser] = useMutation(ACTIVATE_USER);
  const [login] = useMutation(LOGIN_USER);

  const registerHandler = useCallback(
    async (name: string, email: string, password: string) => {
      if (
        name.trim().length === 0 ||
        email.trim().length === 0 ||
        password.trim().length === 0
      ) {
        if (email.trim().length === 0) {
          setEmailError("Email is required");
          setErrorNot("Email is required");
          setPasswordError(" ");
          setUsernameError(" ");
        } else if (password.trim().length === 0) {
          setPasswordError("Password is required");
          setErrorNot("Password is required");
          setUsernameError(" ");
          setEmailError(" ");
        } else if (name.trim().length === 0) {
          setEmailError("Email is required");
          setErrorNot("Email is required");
          setPasswordError(" ");
          setUsernameError(" ");
        }
        return;
      }
      setIsLoading(true);
      setUsernameError("");
      setPasswordError("");
      setEmailError("");
      setShowOTPInput(false);

      try {
        const { data } = await register({
          variables: {
            name: name,
            email: email.toLowerCase(),
            password: password,
          },
        });
        setActivationToken(data.register.activation_token);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setErrorNot("An error occurred. Please try again.");
        setIsLoading(false);
      }
    },
    []
  );

  const handleSignUpPress = useCallback(() => {
    registerHandler(name, email, password);
    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      if (email.trim().length === 0) {
        setEmailError("Email is required");
        setErrorNot("Email is required");
        setPasswordError(" ");
        setUsernameError(" ");
        setShowOTPInput(false);
      } else if (password.trim().length === 0) {
        setPasswordError("Password is required");
        setErrorNot("Password is required");
        setUsernameError(" ");
        setEmailError(" ");
        setShowOTPInput(false);
      } else if (name.trim().length === 0) {
        setEmailError("Email is required");
        setErrorNot("Email is required");
        setPasswordError(" ");
        setUsernameError(" ");
        setShowOTPInput(false);
      }
      return;
    }
    setShowOTPInput(true);
  }, [name, email, password, registerHandler]);

  const verifyOTPHandler = async () => {
    if (!activationToken) return;
    const { data } = await activateUser({
      variables: {
        activationToken: activationToken,
        activationCode: otp,
      },
    });

    const { data: dataLogin } = await login({
      variables: {
        email: email.toLowerCase(),
        password: password,
      },
    });
    await AsyncStorage.setItem("access_token", dataLogin.login.accessToken);
    await AsyncStorage.setItem("refresh_token", dataLogin.login.refreshToken);
    router.replace("/(tabs)");
  };

  if (loading) {
    return (
      <View className="h-full bg-[#121111] flex justify-center items-center">
        <ActivityIndicator
          className="w-[50px] h-[50px]"
          size="large"
          color="white"
        />
      </View>
    );
  }

  return (
    <View className="bg-[#121111] h-full w-screen">
      {showOTPInput && (
        <View className="bg-[#121111] h-full w-screen flex justify-center items-center mt-4 absolute z-10">
          <Text className="text-white mb-5 text-xl">
            Введите код для подтверждения
          </Text>
          <View className="flex justify-center w-[80%]">
            <OtpInput
              numberOfDigits={6}
              focusColor="grey"
              focusStickBlinkingDuration={500}
              onTextChange={setOtp}
            />
          </View>
          <View>
            <Pressable
              className="w-[250] h-[50] rounded-[15] flex justify-center items-center bg-white mt-4"
              onPress={verifyOTPHandler}
            >
              <Text className="text-2xl text-black">Verify OTP</Text>
            </Pressable>
          </View>
        </View>
      )}
      <View className="w-[40] bg-[#121111] m-5">
        <TouchableOpacity onPress={() => router.replace("/")}>
          <MoveLeft color="white" />
        </TouchableOpacity>
      </View>
      <View className="bg-[#121111] flex justify-center gap-2 items-center h-full pb-[150]">
        <Text className="text-white flex flex-col mt-10 text-3xl text-center">
          {i18n.t("signup")}
        </Text>
        {errorNot && <Text className="text-red-500  text-2xl">{errorNot}</Text>}
        <Input
          className="w-[350]"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Input
          className="w-[350]"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          className="w-[350]"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View className="flex justify-end items-center pb-5 absolute h-full w-screen">
        <Pressable
          className="w-[350] h-[70] rounded-[15] flex justify-center items-center bg-white"
          onPress={handleSignUpPress}
        >
          <Text className="text-2xl text-black">{i18n.t("signup")}</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default index;
