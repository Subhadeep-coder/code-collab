"use client";

import React, { useEffect, useState } from "react";
import { CodeSpace } from "../components/Editor/CodeEditor";
import ExtraActivities from "../components/ExtraActivities";
import { EnhancedCodeEditor } from "../components/Editor/EnhancedCodeEditor";
import { CollaborativeEditor } from "../components/Editor/CollaborativeEditor";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "components/ui/resizable";
import { Terminal } from "components/Editor/Terminal";
import WelcomePage from "components/default";
import { useFileContext } from "providers/file-provider";

export default function HomePage() {
  const [isCollaborative, setIsCollaborative] = useState<boolean>(false);
  const [showWelcomePage, setShowWelcomePage] = useState<boolean>(true);
  const { selectedFile, recentFiles } = useFileContext();
  const handleWelcomePageClose = () => {
    setShowWelcomePage(false);
  }

  useEffect(() => {
    if (selectedFile || recentFiles.length > 0) {
      setShowWelcomePage(false);
    }
  }, [selectedFile, recentFiles]);

  const shouldShowWelcomePage = !selectedFile && recentFiles.length === 0;

  return (
    <ResizablePanelGroup direction="vertical" className="h-full bg-[#1e1e1e]">
      <ResizablePanel defaultSize={75} minSize={30} maxSize={85} className="min-h-0">
        {
          showWelcomePage || shouldShowWelcomePage ? (
            <WelcomePage onClose={handleWelcomePageClose} />
          ) : (
            <div className="flex h-full overflow-hidden">
              <div className="flex-1 flex gap-x-3 h-full w-full overflow-hidden">
                {
                  isCollaborative ? (
                    <>
                      <CodeSpace>
                        <CollaborativeEditor />
                      </CodeSpace>
                      <ExtraActivities />
                    </>
                  ) : (
                    selectedFile && (
                      <EnhancedCodeEditor
                        filePath={selectedFile.path}
                        fileContent={
                          recentFiles.find((file) => file.path === selectedFile.path)?.content || ""
                        }
                        extension={
                          recentFiles.find((file) => file.path === selectedFile.path)?.extension || ""
                        }
                      />
                    )
                  )
                }
              </div>
            </div>
          )
        }
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25} minSize={15} maxSize={70} className="bg-[#1e1e1e]">
        <Terminal className="h-full" />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
