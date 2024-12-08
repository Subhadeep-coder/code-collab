import React from "react";
import { Terminal } from "./Editor/Terminal";
import Sidebar from "./sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-full flex gap-x-2">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden gap-y-3">
        <div className="flex-1 overflow-auto">
          {children}
        </div>
        <Terminal />
      </div>
    </div>
  );
};
