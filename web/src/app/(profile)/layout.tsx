import { ApolloWrapperServer } from "@/features/graphql/server/apollo-wrapper-server";
import SideBar from '@/widgets/side-bar/side-bar'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloWrapperServer>
      <main className="flex h-[100vh] w-[100vw]">
        <SideBar/>
        {children}
      </main>
    </ApolloWrapperServer>
  )
}
