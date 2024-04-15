import React from "react";

interface IMainLayout extends React.HTMLAttributes<HTMLDivElement> {}

const MainLayout = ({ children }: IMainLayout) => {
  return <main className="w-[95%] m-auto">{children}</main>;
};

export default MainLayout;