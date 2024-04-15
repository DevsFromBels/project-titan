"use client";

import useProfile from "@/shared/hooks/use-profile";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from '@/shared/graphql/actions/login.action';
import { Input } from "@/shared/components/ui/input";
import Cookies from "js-cookie";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import useUser from "@/shared/hooks/use-user";

const SignInPage = () => {
  const profile = useProfile({ name: "nikita" });
  const [login, { loading: signInLoading }] = useMutation(LOGIN_USER);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useUser()

  if (profile.loading && user.loading) {
    return "Loading...";
  }

  if(signInLoading) {
    return "Signing...";
  }

  console.log(user)
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await login({ variables: { email, password } });
    Cookies.set("refresh_token", res.data.login.refreshToken);
    Cookies.set("access_token", res.data.login.accessToken);
  };

  return (
    <div>
      <h2 className="flex flex-col mt-10 text-xl text-center">Sign up</h2>
      {user.user?.name && (
        <h2>Hello, {user.user.name}</h2>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
};

export default SignInPage;