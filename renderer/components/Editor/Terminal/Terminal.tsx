"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Terminal as XTerminal } from "@xterm/xterm"
import { FitAddon } from "@xterm/addon-fit"
import "@xterm/xterm/css/xterm.css"
import { GetCommandOutput } from "types/terminal-functions"
import { terminalService } from "lib/terminal-service"

type Props = {
  className?: string
}

export const Terminal: React.FC<{ terminalId: string, className?: string }> = ({ terminalId, className }) => {
  const terminalRef = useRef<HTMLDivElement>(null)
  // const [terminal, setTerminal] = useState<XTerminal | null>(null)
  // const [fitAddon, setFitAddon] = useState<FitAddon | null>(null)

  useEffect(() => {
    if (!terminalRef.current) return
    // Initialize xterm.js only once.
    const newTerminal = new XTerminal();
    const newFitAddon = new FitAddon();
    newTerminal.loadAddon(newFitAddon);
    newTerminal.open(terminalRef.current);
    newFitAddon.fit();

    // Create the terminal session in the main process.
    // window.context.createTerminal(terminalId);
    // ipcRenderer.invoke('create-terminal', terminalId);

    // On mount, fetch and display any existing log history.
    // window.context.getTerminalLogs(terminalId).then((log) => {
    //   if (log) {
    //     newTerminal.write(log);
    //   }
    // })
    terminalService.getTerminalLogs(terminalId, (log) => {
      if (log) {
        newTerminal.write(log);
      }
    });
    // ipcRenderer.invoke('get-terminal-logs', terminalId).then((log) => {
    //   if (log) {
    //     newTerminal.write(log);
    //   }
    // });

    // Listen for incoming terminal data.
    const incDataListener: GetCommandOutput = (_: any, incomingterminalId: string, data: string) => {
      if (incomingterminalId === terminalId) {
        newTerminal.write(data);
      }
    };
    terminalService.getCommandOutput(incDataListener);
    // window.context.getCommandOutput(incDataListener);
    // ipcRenderer.on('terminal-incData', incDataListener);

    // Forward user input from xterm.js to the main process.
    newTerminal.onData((data) => {
      terminalService.runCommand(terminalId, data);
      // ipcRenderer.send('terminal-toShell', terminalId, data);
    });

    // Handle window resizes.
    const handleResize = () => {
      newFitAddon.fit();
      terminalService.resizeTerminal(terminalId, newTerminal.cols, newTerminal.rows);
      // ipcRenderer.send('resize-terminal', terminalId, newTerminal.cols, newTerminal.rows);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup listeners on unmount.
    return () => {
      terminalService.removeListner(incDataListener);
      // ipcRenderer.removeListener('terminal-incData', incDataListener);
      window.removeEventListener('resize', handleResize);
    };
  }, [terminalId]);

  return <div ref={terminalRef} className={`w-full h-full bg-[#1e1e1e] ${className}`} />
}

