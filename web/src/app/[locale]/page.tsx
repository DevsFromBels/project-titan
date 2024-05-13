'use client'

import useUser from "@/shared/hooks/use-user";
import CenterLoader from "@/widgets/center-loader/center-loader";
import dynamic from "next/dynamic";

const GlobalPage = dynamic(() => import("@/views/global/global"), {
  ssr: false
});

export default function Home() {
  const user = useUser();

  if(user.loading) {
    return <CenterLoader/>
  }

  if(user.user?.name) {
    return <GlobalPage />
  }

  return <h1>Hello, world!</h1>
}
