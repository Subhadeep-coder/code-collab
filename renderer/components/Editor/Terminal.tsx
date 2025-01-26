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
  const commandBufferRef = useRef("");

  useEffect(() => {
    if (!terminalRef.current) return;

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
    });

    const newFitAddon = new FitAddon();
    newTerminal.loadAddon(newFitAddon);
    newTerminal.open(terminalRef.current);
    newFitAddon.fit();

    // Setup terminal state
    setTerminal(newTerminal);
    setFitAddon(newFitAddon);

    // Initialize terminal UI
    newTerminal.writeln("\x1b[36mInteractive Terminal - Powered by Electron\x1b[0m");
    newTerminal.writeln("");
    writePrompt(newTerminal);

    return () => {
      newTerminal.dispose();
    };
  }, []);

  const writePrompt = (term: XTerminal) => {
    term.write("\x1b[32m> \x1b[0m");
  };

  const handleCommand = async (command: string) => {
    if (!command.trim()) {
      terminal?.writeln("");
      writePrompt(terminal!);
      return;
    }

    // Write the command to the terminal
    terminal?.writeln("");
    // Execute the command via IPC
    console.log(command);
    window.context.removeCommandOutputListeners();
    await window.context.runCommand(command);
    window.context.getCommandOutput((event, data) => {
      if (data.error) {
        terminal?.writeln(`\x1b[31m${data.error}\x1b[0m`);
      } else if (data.output) {
        terminal?.writeln(`\x1b[37m${data.output}\x1b[0m`);
      } else {
        terminal?.writeln(`\x1b[33mUnknown response\x1b[0m`);
      }
    });

    window.context.getProcessDone(() => {
      commandBufferRef.current = "";
      writePrompt(terminal!);
    });

  };


  useEffect(() => {
    if (!terminal) return;

    const handleKeyInput = (data: string) => {
      switch (data) {
        case "\r": // Enter
          handleCommand(commandBufferRef.current);
          break;

        case "\u007F": // Backspace
          if (commandBufferRef.current.length > 0) {
            commandBufferRef.current = commandBufferRef.current.slice(0, -1);
            terminal.write("\b \b");
          }
          break;

        default:
          if (data >= String.fromCharCode(32) && data <= String.fromCharCode(126)) {
            commandBufferRef.current += data;
            terminal.write(data);
          }
      }
    };

    terminal.onData(handleKeyInput);
  }, [terminal]);

  useEffect(() => {
    if (!terminal || !fitAddon) return;

    const handleResize = () => {
      fitAddon.fit();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [terminal, fitAddon]);

  return <div ref={terminalRef} className="w-full h-full bg-[#1e1e1e]" />;
};

