"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Terminal as XTerminal } from "@xterm/xterm"
import { FitAddon } from "@xterm/addon-fit"
import "@xterm/xterm/css/xterm.css"
import { GetCommandOutput } from "types/terminal-functions"
import { terminalService } from "lib/terminal-service"

type Props = { terminalId: string, className?: string, onMount?: () => void }

export const Terminal: React.FC<Props> = ({ terminalId, className, onMount }) => {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!terminalRef.current) return;
    
    const newTerminal = new XTerminal();
    const newFitAddon = new FitAddon();
    newTerminal.loadAddon(newFitAddon);
    newTerminal.open(terminalRef.current);
    newFitAddon.fit();

    if (onMount) {
      onMount()
    }
    terminalService.getTerminalLogs(terminalId, (log) => {
      if (log) {
        newTerminal.write(log);
      }
    });

    // Listen for incoming terminal data.
    const incDataListener: GetCommandOutput = (_: any, incomingterminalId: string, data: string) => {
      if (incomingterminalId === terminalId) {
        newTerminal.write(data);
      }
    };
    terminalService.getCommandOutput(incDataListener);

    // Forward user input from xterm.js to the main process.
    newTerminal.onData((data) => {
      terminalService.runCommand(terminalId, data);
    });

    // Handle window resizes.
    const handleResize = () => {
      newFitAddon.fit();
      terminalService.resizeTerminal(terminalId, newTerminal.cols, newTerminal.rows);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      terminalService.removeListner(incDataListener);
      window.removeEventListener('resize', handleResize);
    };
  }, [terminalId]);

  return <div ref={terminalRef} className={`w-full h-full bg-[#1e1e1e] ${className}`} />
}

