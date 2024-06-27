import { Input } from "../../../components/ui/Input";
import { LOGIN_USER } from "../../../graphql/actions/login.action";
import { i18n } from "@/localization/i18n";
import { useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { Eye, EyeOff, MoveLeft } from "lucide-react-native";
import { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorNot, setErrorNot] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  const loginHandler = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await login({
        variables: {
          email: email.toLowerCase(),
          password: password,
        },
      });
      await AsyncStorage.setItem("access_token", data.login.accessToken);
      await AsyncStorage.setItem("refresh_token", data.login.refreshToken);
      router.replace("/(tabs)");
      setIsLoading(false);
    } catch (err) {
      setErrorNot("Неверный пароль или почта");
      setIsLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <View className="h-screen bg-[#121111] flex justify-center items-center">
        <ActivityIndicator
          className="w-[50px] h-[50px]"
          size="large"
          color="white"
        />
      </View>
    );
  }

  return (
    <SafeAreaView className="h-full">
      <View className="w-[40] bg-[#121111] m-5">
        <TouchableOpacity onPress={() => router.replace("/")}>
          <MoveLeft color="white" />
        </TouchableOpacity>
      </View>
      <View className="flex items-center justify-center pb-[200] gap-3 w-screen h-screen bg-[#121111]">
        <Text className="text-white flex flex-col mt-10 text-3xl text-center">
          {i18n.t("signin")}
        </Text>
        {errorNot && (
          <Text className="text-red-500 text-2xl mb-1">{errorNot}</Text>
        )}
        <View className="w-[350] mb-2">
          {emailError && (
            <Text className="text-red-500 text-sm mb-1">{emailError}</Text>
          )}
          <Input
            className="w-[350]"
            placeholder="Электронная почта"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View className="w-[350] mb-2">
          {passwordError && (
            <Text className="text-red-500 text-sm mb-1">{passwordError}</Text>
          )}
          <View className="flex-row items-center gap-2 w-[360]">
            <Input
              style={{ width: 290 }}
              placeholder="Пароль"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff className="absolute" size="50" color={"white"} />
              ) : (
                <Eye className="absolute" size="50" color={"white"} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex justify-end items-center pb-5 absolute h-screen w-screen">
        <Pressable
          className="w-[350] h-[70] rounded-[15] flex justify-center items-center bg-white"
          onPress={() => loginHandler(email, password)}
        >
          <Text className="text-2xl text-black">{i18n.t("signin")}</Text>
        </Pressable>
      </View>
      {/* <View className="flex justify-center items-center absolute h-screen w-screen " style={{ marginTop: 80 }}>
        <Text className="text-white">
          <Link href="/ch-pass">Забыли пароль?</Link>
        </Text>
      </View> */}
    </SafeAreaView>
  );
};

export default SignInPage;
