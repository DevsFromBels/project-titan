"use client";

import useProfile from "@/shared/hooks/use-profile";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/shared/graphql/actions/login.action";
import { Input } from "@/shared/components/ui/input";
import Cookies from "js-cookie";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import useUser from "@/shared/hooks/use-user";
import { redirect } from "next/navigation";

const SignInPage = () => {
  const [login, { loading: signInLoading }] = useMutation(LOGIN_USER);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const profile = useProfile({ name: "nikita" });
  const user = useUser();

  if (profile.loading && user.loading) {
    return "Loading...";
  }

  if (signInLoading) {
    return "Signing...";
  }

  if (user.user?.name) {
    redirect("/");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await login({ variables: { email, password } });

    console.log(profile);
    if (res.data.login.error) return;

    console.log(res.data.login.refreshToken)
    console.log(res.data.login.accessToken)

    Cookies.set("refresh_token", res.data.login.refreshToken, {
      domain: "localhost",
    });
    Cookies.set("access_token", res.data.login.accessToken, {
      domain: "localhost",
    });

    location.reload()
  };

  return (
    <div className="h-[calc(100vh-3rem)] w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="
        w-[25rem]
        h-[260px]
        flex
        flex-col
        gap-4
        border
        p-4
        rounded-lg
        justify-center
        shadow
        "
      >
        <h2 className="flex flex-col text-xl text-center">Sign In</h2>
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
