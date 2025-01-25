"use client"

import type React from "react"
import Sidebar from "./sidebar/Sidebar"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable"

type Props = {
  children: React.ReactNode
}

export const AppLayout = ({ children }: Props) => {

  return (
    <ResizablePanelGroup direction="horizontal" className="w-full h-full bg-[#1e1e1e]">
      <ResizablePanel defaultSize={25} minSize={15} maxSize={30}>
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}