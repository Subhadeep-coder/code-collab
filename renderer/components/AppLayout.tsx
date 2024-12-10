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
    // <ResizablePanelGroup direction="vertical" className="h-full">
    //     <ResizablePanel defaultSize={75} minSize={10} maxSize={85}>
    //       <div className="flex h-full items-center justify-center">
    //         <Editor
    //           code={code}
    //           setCode={setCode}
    //           fontSize={fontSize}
    //           setFontSize={setFontSize}
    //           fontFamily={fontFamily}
    //           setFontFamily={setFontFamily}
    //         />
    //       </div>
    //     </ResizablePanel>
    //     <ResizableHandle />
    //     <ResizablePanel defaultSize={25} minSize={15} maxSize={70}>
    //       <div className="flex h-full items-center justify-center">
    //         <OutputScreen output={output}></OutputScreen>
    //       </div>
    //     </ResizablePanel>
    //   </ResizablePanelGroup>
  );
};
