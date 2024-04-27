'use client'

import useUser from "@/shared/hooks/use-user";

export default function Home() {
  const user = useUser();

  if(user.user?.name) {
    return `Welcome ${user.user?.name}`
  }

  return (
    <main>
      <h2>Hello, world</h2>
    </main>
  );
}
