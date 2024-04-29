"use client";
import { REGISTER_USER } from "@/features/graphql/actions/register.action";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import Loader from "@/shared/components/ui/loader/loader";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import React from "react";
import { redirect } from "next/navigation";
import { ACTIVATE_USER } from "@/features/graphql/actions/activation.action";
import { useRegistrationStore } from "@/features/store/register.store";
import useUser from "@/shared/hooks/use-user";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { handleAuth } from "@/features/auth/auth";

const SignUpLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <Loader />
    </div>
  );
};

const SignUpPage = () => {
  const { register, signUpLoading, confirmRegister, OTPLoading } = handleAuth();
  const user = useUser();

  const {
    email,
    name,
    password,
    setName,
    setEmail,
    setPassword,
    setOtp,
    otpDialog,
    setOtpDialog,
  } = useRegistrationStore();

  if (user.loading || OTPLoading || signUpLoading) {
    return <SignUpLoader />;
  }

  if (user.user?.name) {
    redirect("/");
  }

  return (
    <div className="h-[calc(100vh-3rem)] w-full flex items-center justify-center">
      <div className="flex border lg:p-4 sm:p-2 rounded-lg lg:gap-[20px] items-center shadow">
        <form
          onSubmit={register}
          className="
            w-[25rem]
            h-[260px]
            flex
            flex-col
            gap-4
            justify-center
            "
        >
          <div className="flex flex-col gap-2 items-center justify-center">
            <Image
              src={"/Logo.svg"}
              width={60}
              height={60}
              alt="Titan project logo"
            />
            <h2 className="flex flex-col text-lg text-center">Sign Up</h2>
          </div>
          <Input
            placeholder="username"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <Button type="submit">Sign Up</Button>
        </form>
        <Dialog open={otpDialog} onOpenChange={setOtpDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter your OTP code from email:</DialogTitle>
              <DialogDescription className="flex items-center justify-center p-6">
                <InputOTP
                  maxLength={6}
                  onChange={(value) => setOtp(value)}
                  onComplete={confirmRegister}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SignUpPage;