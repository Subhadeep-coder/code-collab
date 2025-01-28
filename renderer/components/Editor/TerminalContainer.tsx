"use client"

import type React from "react"
import { useState } from "react"
import { Terminal } from "./Terminal/Terminal"
import { Sidebar } from "./Terminal/Sidebar"
import { Topbar } from "./Terminal/Topbar"

type TerminalType = {
  id: string
  name: string
}

type TopbarElementType = {
  id: number
  name: string
}

export const TerminalContainer: React.FC = () => {
  const [terminals, setTerminals] = useState<TerminalType[]>([{ id: "powershell", name: "powershell" }])
  const [activeTerminal, setActiveTerminal] = useState<string>("powershell")
  const [activeTopbarElement, setActiveTopbarElement] = useState<number>(1) // Assuming 1 is for "Terminal"

  const topbarElements: TopbarElementType[] = [
    { id: 1, name: "Terminal" },
    { id: 2, name: "Output" },
  ]

  const addTerminal = () => {
    const newId = `terminal-${terminals.length + 1}`
    const newTerminal = { id: newId, name: `powershell` }
    setTerminals([...terminals, newTerminal])
    setActiveTerminal(newId)
  }

  const closeTerminal = () => {
    if (terminals.length > 1) {
      const newTerminals = terminals.filter((t) => t.id !== activeTerminal)
      setTerminals(newTerminals)
      setActiveTerminal(newTerminals[newTerminals.length - 1].id)
    }
  }

  const handleSelectTerminal = (id: string) => {
    setActiveTerminal(id)
  }

  const handleSelectTopbarElement = (id: number) => {
    setActiveTopbarElement(id)
    // You can add additional logic here if needed when switching between Terminal and Output
  }

  return (
    <div className="flex h-screen">
      <div className="flex-grow flex flex-col">
        <Topbar
          onAddTerminal={addTerminal}
          onCloseTerminal={closeTerminal}
          activeTerminal={activeTopbarElement}
          onSelectTerminal={handleSelectTopbarElement}
          terminals={topbarElements}
        />
        <div className="flex flex-grow">
          <Terminal className="flex-grow" />
          <Sidebar terminals={terminals} onSelectTerminal={handleSelectTerminal} activeTerminal={activeTerminal} />
        </div>
      </div>
    </div>
  )
}