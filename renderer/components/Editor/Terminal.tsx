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
  const currentPathRef = useRef("C:\\Users\\User");

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

    setTerminal(newTerminal);
    setFitAddon(newFitAddon);

    // Initial terminal setup
    newTerminal.writeln("\x1b[2m\x1b[36m# Command Prompt - VSCode Terminal\x1b[0m");
    newTerminal.writeln("Microsoft Windows [Version 10.0.19045.3803]");
    newTerminal.writeln("(c) Microsoft Corporation. All rights reserved.");
    newTerminal.writeln("");
    writePrompt(newTerminal);

    return () => {
      newTerminal.dispose();
    };
  }, []);

  const writePrompt = (term: XTerminal) => {
    term.write(`\x1b[32m${currentPathRef.current}>\x1b[0m `);
  };

  const handleCommand = (command: string, term: XTerminal) => {
    const cmd = command.trim().toLowerCase();

    switch (cmd) {
      case 'cls':
        term.clear();
        break;
      case 'dir':
        term.writeln(' Directory of ' + currentPathRef.current);
        term.writeln('');
        term.writeln(' <DIR>    Desktop');
        term.writeln(' <DIR>    Documents');
        term.writeln(' <DIR>    Downloads');
        term.writeln(' <DIR>    Pictures');
        term.writeln('');
        break;
      case 'echo %cd%':
      case 'cd':
        term.writeln(currentPathRef.current);
        break;
      case 'help':
        term.writeln('Available commands:');
        term.writeln('  cls     - Clear the screen');
        term.writeln('  dir     - List directory contents');
        term.writeln('  cd      - Show current directory');
        term.writeln('  help    - Show this help message');
        term.writeln('  ver     - Show version information');
        break;
      case 'ver':
        term.writeln('Microsoft Windows [Version 10.0.19045.3803]');
        break;
      case '':
        break;
      default:
        term.writeln(`'${command}' is not recognized as an internal or external command,`);
        term.writeln('operable program or batch file.');
    }
  };

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

    const handleKeyInput = (data: string) => {
      switch (data) {
        case '\r': // Enter
          terminal.writeln('');
          handleCommand(commandBufferRef.current, terminal);
          commandBufferRef.current = '';
          writePrompt(terminal);
          break;

        case '\u007F': // Backspace
          if (commandBufferRef.current.length > 0) {
            commandBufferRef.current = commandBufferRef.current.slice(0, -1);
            terminal.write('\b \b');
          }
          break;

        case '\u0003': // Ctrl+C
          terminal.writeln('^C');
          commandBufferRef.current = '';
          writePrompt(terminal);
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

  return (
    <div
      ref={terminalRef}
      className={`w-full h-full overflow-hidden bg-[#1e1e1e] ${className}`}
    />
  );
};