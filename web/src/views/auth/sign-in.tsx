"use client";

import CenterLoader from '@/widgets/center-loader/center-loader'
import QRCodeSignIn from '@/shared/components/maleculas/qr-code-sign-in'
import useUser from '@/shared/hooks/use-user'
import { Button } from '@/shared/components/ui/button'
import { handleAuth } from '@/features/auth/auth'
import { Input } from '@/shared/components/ui/input'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import AnimatedGridPattern from '@/shared/components/ui/animated-grid-pattern';
import { cn } from '@/shared/lib/utils';


const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signInLoading } = handleAuth();
  const { theme } = useTheme();
  const qrcode_url = '12345'
  const user = useUser();
  
  if (user.loading || signInLoading) {
    return <CenterLoader />;
  }

  if (user.user?.name) {
    redirect("/");
  }

  return (
    <div className="h-[calc(100vh-3rem)] w-full flex items-center justify-center">
      <div className="flex bg-background border lg:p-4 sm:p-2 rounded-lg lg:gap-6 items-center shadow z-20">
        <form
          onSubmit={(event) => login(event, email, password)}
          className="
            // w-[23rem]
            max-w-[25rem]
            h-[260px]
            flex
            flex-col
            gap-4
            p-1
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
        {/* <QRCodeSignIn url={qrcode_url} theme={theme}/> */}
      </div>
      <AnimatedGridPattern
      maxOpacity={0.4}
      className='z-10 blur-[3px]'
      />
    </div>
  );
};

export default SignInPage;
