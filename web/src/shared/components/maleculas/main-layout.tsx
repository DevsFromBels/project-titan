import React from "react";

interface IMainLayout extends React.HTMLAttributes<HTMLDivElement> {}

const MainLayout = ({ children }: IMainLayout) => {
  return <main className="w-[100%] flex m-auto">{children}</main>;
};

export default MainLayout;
