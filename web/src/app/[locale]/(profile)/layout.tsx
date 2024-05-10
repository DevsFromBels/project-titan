import { ApolloWrapperServer } from "@/features/graphql/server/apollo-wrapper-server";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <ApolloWrapperServer>
        <main className="flex h-[100vh] w-[100vw]">
          {children}
        </main>
      </ApolloWrapperServer>
  );
}
