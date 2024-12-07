import React from "react";
import { Terminal } from "./Terminal";
import Sidebar from "./sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-full flex gap-x-2">
      <Sidebar />
      <div className="h-full w-full flex flex-col gap-y-2">
        {children}
        <Terminal />
      </div>
    </div>
  );
};
