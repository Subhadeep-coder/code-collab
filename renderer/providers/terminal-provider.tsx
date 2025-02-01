"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { Terminal, TerminalType } from 'types/terminal-functions';

// Define the shape of the context
type TerminalContextType = {
  terminals: TerminalType[]
  activeTerminalId: string
  addTerminal: () => void
  removeTerminal: (id: string) => void
  selectTerminal: (id: string) => void
}

// Create the context
const TerminalContext = createContext<TerminalContextType | undefined>(undefined)

// Create a provider component
export const TerminalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [terminals, setTerminals] = useState<TerminalType[]>([])
  const [activeTerminalId, setActiveTerminalId] = useState<string>("")

  useEffect(() => {
    const createTerminal = () => {
      const newId = `terminal-${terminals.length + 1}`
      const terminalType: Terminal = "POWERSHELL";
      const newTerminal: TerminalType = {
        id: newId,
        name: terminalType.toLowerCase(),
        terminalType
      };
      window.context.createTerminal(newId);
      setTerminals(prevTerminals => [...prevTerminals, newTerminal])
      setActiveTerminalId(newId)
    }

    createTerminal();
  }, [])


  const addTerminal = useCallback(() => {
    const newId = `terminal-${terminals.length + 1}`
    const terminalType: Terminal = "POWERSHELL";
    const newTerminal: TerminalType = {
      id: newId,
      name: terminalType.toLowerCase(),
      terminalType
    };
    window.context.createTerminal(newId);
    setTerminals(prevTerminals => [...prevTerminals, newTerminal])
    setActiveTerminalId(newId)
  }, [terminals])

  const removeTerminal = useCallback((id: string) => {
    if (terminals.length > 1) {
      const newTerminals = terminals.filter(t => t.id !== id)
      setTerminals(newTerminals)
      setActiveTerminalId(newTerminals[newTerminals.length - 1].id)
    }
  }, [terminals])

  const selectTerminal = useCallback((id: string) => {
    setActiveTerminalId(id)
  }, [])

  return (
    <TerminalContext.Provider value={{
      terminals,
      activeTerminalId,
      addTerminal,
      removeTerminal,
      selectTerminal
    }}>
      {children}
    </TerminalContext.Provider>
  )
}

// Custom hook to use the Terminal context
export const useTerminalContext = () => {
  const context = useContext(TerminalContext)
  if (context === undefined) {
    throw new Error('useTerminalContext must be used within a TerminalProvider')
  }
  return context
}