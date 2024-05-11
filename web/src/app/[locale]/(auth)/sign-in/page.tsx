import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import dynamic from "next/dynamic";
import React from "react";

const SignIn = dynamic(() => import("@/views/auth/sign-in"));

export const metadata: Metadata = {
  title: 'Sign In - Titan Advertisement',
  description: 'Sign in to the Titan account',
}

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;
