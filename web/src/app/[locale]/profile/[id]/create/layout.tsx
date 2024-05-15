import ApolloProviderClient from "@/shared/Providers/ApolloProvider";
import React from "react";

const CreateLayout = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProviderClient>{children}</ApolloProviderClient>;
};

export default CreateLayout;
