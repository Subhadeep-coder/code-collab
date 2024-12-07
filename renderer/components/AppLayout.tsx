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
