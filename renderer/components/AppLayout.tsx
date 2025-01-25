"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Sidebar from "./sidebar/Sidebar"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable"
import { Terminal } from "./Editor/Terminal"
import { EnhancedCodeEditor } from "./Editor/EnhancedCodeEditor"
import WelcomePage from "./default"

type Props = {
  children: React.ReactNode
}

export const AppLayout = ({ children }: Props) => {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(true)
  const [showWelcomePage, setShowWelcomePage] = useState<boolean>(true)

  const handleWelcomePageClose = () => {
    setShowWelcomePage(false)
  }

  // If it's first time or welcome page is enabled, show welcome page
  if (isFirstTimeUser || showWelcomePage) {
    return (
      <ResizablePanelGroup direction="horizontal" className="w-full h-full bg-[#1e1e1e]">
        <ResizablePanel defaultSize={25} minSize={15} maxSize={30}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>
          <WelcomePage   onClose={handleWelcomePageClose} />
        </ResizablePanel>
      </ResizablePanelGroup>
    )
  }

  // Otherwise show the editor layout
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full h-full bg-[#1e1e1e]">
      <ResizablePanel defaultSize={15} minSize={15} maxSize={30}>
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>
        <ResizablePanelGroup direction="vertical" className="h-full bg-[#1e1e1e]">
          <ResizablePanel defaultSize={75} minSize={30} maxSize={85} className="min-h-0">
            {children}
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={25} minSize={15} maxSize={70} className="bg-[#1e1e1e]">
            <Terminal className="h-full" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}