import React from "react";
import { Terminal } from "./Editor/Terminal";
import Sidebar from "./sidebar/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

type Props = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-full flex gap-x-2">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden gap-y-3">
        <ResizablePanelGroup direction="vertical" className="h-full">
          <ResizablePanel defaultSize={75} minSize={10} maxSize={85}>
            {children}
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={25} minSize={15} maxSize={70}>
            <div className="flex h-full items-center justify-center">
              <Terminal />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>

  );
};
