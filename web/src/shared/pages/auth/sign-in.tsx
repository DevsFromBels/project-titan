"use client";

import { Input } from "@/shared/components/ui/input";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import useUser from "@/shared/hooks/use-user";
import { redirect } from "next/navigation";
import Loader from "@/shared/components/ui/loader/loader";
import { QRCode } from "react-qrcode-logo";
import Logo from "../../../app/favicon.ico";
import { useTheme } from "next-themes";
import { handleAuth } from "@/features/auth/auth";

const SignInLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <Loader />
    </div>
  );
};

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signInLoading } = handleAuth();
  const { theme } = useTheme();
  const user = useUser();
  
  if (user.loading || signInLoading) {
    return <SignInLoader />;
  }

  if (user.user?.name) {
    redirect("/");
  }

  return (
    <div className="h-[calc(100vh-3rem)] w-full flex items-center justify-center">
      <div className="flex border lg:p-4 sm:p-2 rounded-lg lg:gap-6 items-center shadow">
        <form
          onSubmit={(event) => login(event, email, password)}
          className="
            w-[25rem]
            h-[260px]
            flex
            flex-col
            gap-4
            justify-center
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
        <div className="lg:flex lg:flex-col lg:text-center lg:gap-5 hidden">
          <QRCode
            value="https://github.com/gcoro/react-qrcode-logo"
            bgColor={theme === "dark" ? "#020817" : "#ffffff"}
            fgColor={theme === "dark" ? "#ffffff" : "#020817"}
            logoPadding={0.1}
            logoWidth={40}
            logoHeight={40}
            logoOpacity={1}
            qrStyle="dots"
            eyeRadius={[3, 3, 3, 3]}
            logoImage={Logo.src}
          />
          <h1>SignIn With Mobile QRCode</h1>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
