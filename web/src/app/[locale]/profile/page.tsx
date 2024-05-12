'use client'
import CenterLoader from "@/widgets/center-loader/center-loader";
import React, { useMemo } from "react";
import { redirect } from "@/navigation";
import useUser from "@/shared/hooks/use-user";

const page =  () => {
  const {user, loading} = useUser()
  const userData = useMemo(() => user, [user]);
  
  if(loading) {
    return <CenterLoader/>
  }

  if(!userData?.id) {
    redirect('/sign-in')
  }

  return redirect(`/profile/${userData?.id}`)

};

export default page;
