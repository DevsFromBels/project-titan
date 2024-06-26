"use client";

import CenterLoader from "@/widgets/center-loader/center-loader";
import Image from "next/image";
import React, { useState } from "react";
import useUser from "@/shared/hooks/use-user";
import { Button } from "@/shared/components/ui/button";
import { handleAuth } from "@/features/auth/auth";
import { Input } from "@/shared/components/ui/input";
import { redirect } from "next/navigation";
import { useRegistrationStore } from "@/features/store/register.store";

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
import AnimatedGridPattern from "@/shared/components/ui/animated-grid-pattern";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const schema = z.object({
  name: z
    .string({ message: "Никнейм должно быть строкой" })
    .min(3, "Никнейм должен быть не менее 3х символов длиной")
    .refine((name) => /^[^0-9].*$/i.test(name), {
      message: "Никнейм не может начинаться с цифры",
    }),
  email: z.string().email("Неверный адрес электронной почты"),
  password: z
    .string()
    .min(8, "Пароль должен быть не менее 8 символов длиной")
    .refine(
      (password) =>
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /\d/.test(password) &&
        /[^A-Za-z\d\s]/.test(password),
      {
        message:
          "Пароль должен содержать минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ",
      }
    ),
});

const SignUpPage = () => {
  const { register, signUpLoading, confirmRegister, OTPLoading } = handleAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    register: registerUser,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

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
    return <CenterLoader />;
  }

  if (user.user?.name) {
    redirect("/");
  }

  const onSubmit = (e: any) => {
    register(e);
  };

  return (
    <div className="h-[calc(100vh-3rem)] w-full flex items-center justify-center">
      <div className="flex bg-background border lg:p-4 sm:p-2 rounded-lg lg:gap-6 items-center shadow">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            w-[22rem]
            h-[400px]
            flex
            flex-col
            gap-4
            p-1
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
            <h2 className="flex flex-col text-lg text-center">Регистрация</h2>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              {...registerUser("name")}
              placeholder="Уникальный никнейм"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-600 text-[12px]">
                {errors?.name?.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Input
              {...registerUser("email")}
              placeholder="электронная почта"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-600 text-[12px]">{errors.email.message as string}</p>
            )}
          </div>
          <div className="flex gap-2 justify-between">
            <div className="w-full">
              <Input
                {...registerUser("password")}
                placeholder="пароль"
                type={!showPassword ? "password" : "text"}
                className="w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-600 text-[12px]">
                  {errors.password.message as string}
                </p>
              )}
            </div>
            <Button variant="outline" onClick={() => setShowPassword(!showPassword)}>{!showPassword ? <EyeIcon/> : <EyeOffIcon/>}</Button>
          </div>
          <Button type="submit">Зарегестрироваться</Button>
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
        <AnimatedGridPattern maxOpacity={0.5} className="z-10 blur-[3px]" />
      </div>
    </div>
  );
};

export default SignUpPage;
