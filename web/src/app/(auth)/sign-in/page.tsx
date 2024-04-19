import dynamic from "next/dynamic";
import React from "react";

const SignIn = dynamic(() => import("@/shared/pages/auth/sign-in"));

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;
