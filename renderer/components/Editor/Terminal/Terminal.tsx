"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Terminal as XTerminal } from "@xterm/xterm"
import { FitAddon } from "@xterm/addon-fit"
import "@xterm/xterm/css/xterm.css"

type Props = {
  className?: string
}

export const Terminal: React.FC<{ terminalId: string, className?: string }> = ({ terminalId, className }) => {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [terminal, setTerminal] = useState<XTerminal | null>(null)
  const [fitAddon, setFitAddon] = useState<FitAddon | null>(null)

  useEffect(() => {
    if (!terminalRef.current) return

    const newTerminal = new XTerminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: '"Cascadia Code", Menlo, monospace',
      theme: {
        background: "#1e1e1e",
        foreground: "#cccccc",
        cursor: "#ffffff",
        cursorAccent: "#1e1e1e",
        selectionBackground: "#264f78",
        black: "#000000",
        red: "#cd3131",
        green: "#0dbc79",
        yellow: "#e5e510",
        blue: "#2472c8",
        magenta: "#bc3fbc",
        cyan: "#11a8cd",
        white: "#e5e5e5",
      },
    })

    const newFitAddon = new FitAddon()
    newTerminal.loadAddon(newFitAddon)
    newTerminal.open(terminalRef.current)
    newFitAddon.fit()

    setTerminal(newTerminal)
    setFitAddon(newFitAddon)

    newTerminal.writeln("\x1b[36mInteractive Terminal - Powered by Electron\x1b[0m")
    // Listen for output from the backend
    window.context.getCommandOutput((_, data) => {
      newTerminal.write(data) // Write backend output to the terminal
    })

    return () => {
      newTerminal.dispose()
      window.context.removeCommandOutputListeners()
    }
  }, [])

  useEffect(() => {
    if (!terminal) return

    const handleKeyInput = (data: string) => {
      window.context.runCommand(data) // Send input directly to the backend
    }

    const disposable = terminal.onData(handleKeyInput)

    // Cleanup: Dispose of the listener when the component unmounts
    return () => {
      disposable.dispose()
    }
  }, [terminal])

  return <div ref={terminalRef} className={`w-full h-full bg-[#1e1e1e] ${className}`} />
}

