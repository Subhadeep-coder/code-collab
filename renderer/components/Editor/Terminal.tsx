"use client";

import React, { useEffect, useRef, useState } from "react";
import { Terminal as XTerminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

type Props = {
  className?: string;
};

export const Terminal: React.FC<Props> = ({ className }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = useState<XTerminal | null>(null);
  const [fitAddon, setFitAddon] = useState<FitAddon | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const newTerminal = new XTerminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: '"Cascadia Code", Menlo, monospace',
      theme: {
        background: "#1e1e1e",
      },
    });

    const newFitAddon = new FitAddon();
    newTerminal.loadAddon(newFitAddon);

    newTerminal.open(terminalRef.current);
    newFitAddon.fit();

    setTerminal(newTerminal);
    setFitAddon(newFitAddon);

    newTerminal.writeln("Welcome to the terminal!");
    newTerminal.writeln('Type "help" for a list of commands.');

    return () => {
      newTerminal.dispose();
    };
  }, []);

  useEffect(() => {
    if (!terminal || !fitAddon) return;

    const handleResize = () => {
      fitAddon.fit();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [terminal, fitAddon]);

  useEffect(() => {
    if (!terminal) return;

    terminal.onData((data) => {
      // Here you can handle the input data
      console.log("Terminal input:", data);

      // Echo the input back to the terminal
      terminal.write(data);

      // Example command handling
      if (data === "\r") {
        // Enter key
        terminal.writeln("");
        terminal.write("\r\n$ ");
      }
    });
  }, [terminal]);

  return (
    <div
      ref={terminalRef}
      className={`w-full h-full overflow-hidden bg-[#1e1e1e] ${className}`}
    />
  );
};
