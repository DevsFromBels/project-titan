import React from 'react'
import dynamic from "next/dynamic";

const SignUp = dynamic(() => import("@/pages/auth/sign-up"));

const page = () => {
  return (
    <SignUp/>
  )
}

export default page