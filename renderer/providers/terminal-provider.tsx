"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { Terminal, TerminalType } from 'types/terminal-functions';
import { useFileContext } from './file-provider';
import { terminalService } from 'lib/terminal-service';

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
  const [terminals, setTerminals] = useState<TerminalType[]>([]);
  const [activeTerminalId, setActiveTerminalId] = useState<string>("");
  const { rootFolderPath } = useFileContext();

  useEffect(() => {
    const createTerminal = async () => {
      const newId = `terminal-${terminals.length + 1}`
      const terminalType: Terminal = "POWERSHELL";
      const newTerminal: TerminalType = {
        id: newId,
        name: terminalType.toLowerCase(),
        terminalType
      };

      await terminalService.createTerminal(newId, null, null, rootFolderPath!);
      setTerminals(prevTerminals => [...prevTerminals, newTerminal])
      setActiveTerminalId(newId)
    }

    createTerminal();

    return () => {
      for (const terminal of terminals) {
        terminalService.killTerminal(terminal.id);
      }
      setTerminals([]);
      setActiveTerminalId("");
    }
  }, [rootFolderPath])


  const addTerminal = useCallback(() => {
    const newId = `terminal-${terminals.length + 1}`
    const terminalType: Terminal = "POWERSHELL";
    const newTerminal: TerminalType = {
      id: newId,
      name: terminalType.toLowerCase(),
      terminalType
    };
    terminalService.createTerminal(newId, null, null, rootFolderPath!);
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