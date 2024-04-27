import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/features/graphql/actions/login.action";
import { ACTIVATE_USER } from "@/features/graphql/actions/activation.action";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { updateTokens } from "./updateTokens";
import { useRegistrationStore } from "../store/register.store";
import { REGISTER_USER } from "../graphql/actions/register.action";

const handleAuth = () => {
  const [signIn, { loading: signInLoading }] = useMutation(LOGIN_USER);
  const [signUp, { loading: signUpLoading }] = useMutation(REGISTER_USER);
  const [confirmOTP, { loading: OTPLoading }] = useMutation(ACTIVATE_USER);
  const { name, email, password, token, otp, setToken, setOtpDialog } = useRegistrationStore();
  const router = useRouter();

  const login = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    const res = await signIn({ variables: { email, password } });

    if (res.data.login.error) return;

    console.log(res.data.login.refreshToken);
    console.log(res.data.login.accessToken);

    Cookies.set("refresh_token", res.data.login.refreshToken, {
      domain: ".titanproject.top",
    });
    Cookies.set("access_token", res.data.login.accessToken, {
      domain: ".titanproject.top",
    });

    updateTokens();
    router.push("/");
  };

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signUp({ variables: { name, email, password } });

    if (res.data.register.error) return;

    const token = res?.data?.register.activation_token;

    setToken(token);
    setOtpDialog(true);
  };

  const confirmRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!token) return;

    const { data } = await confirmOTP({
      variables: {
        activationToken: token,
        activationCode: otp,
      },
    });

    console.log(data);

    if (!data.activateUser.user.name && !data.activateUser.user.email) return;

    login(e, email, password);
    setOtpDialog(false);
  };

  return {
    login,
    signInLoading,
    register,
    signUpLoading,
    confirmRegister,
    OTPLoading,
  };
};

export { handleAuth };
