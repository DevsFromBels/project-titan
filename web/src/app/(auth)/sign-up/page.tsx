import React from 'react'
import dynamic from "next/dynamic";

const SignUp = dynamic(() => import("@/views/auth/sign-up"));

export const metadata: Metadata = {
  title: 'Sign Up - Titan Advertisement',
  
  description: 'Create a Titan account',
}

const page = () => {
  return (
    <SignUp/>
  )
}

export default page