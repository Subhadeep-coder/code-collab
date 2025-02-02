// terminal-service.ts
import os from "os";
import { app, BrowserWindow } from "electron";
import { CreateTerminal, GetTerminalLogs, KillTerminal, ResizeTerminal, RunCommand } from "../types/terminal-functions";
import { IPty, spawn } from "node-pty";

interface TerminalMap {
    [termId: string]: IPty;
}

interface TerminalLogMap {
    [termId: string]: string;
}

class TerminalService {
    private terminals: TerminalMap;
    private terminalLogs: TerminalLogMap;

    constructor() {
        this.terminals = {};
        this.terminalLogs = {};
    }

    /**
     * Creates a new terminal instance.
     * Instead of forking a worker, we directly spawn a PTY process.
     */
    createTerminal: CreateTerminal = (termId, shell, args, rootPath) => {
        // Determine working directory; use rootPath if provided otherwise fallback to HOME.
        const cwd = rootPath === null ? process.env.HOME || "" : rootPath;
        // Set default shell if not provided.
        shell = shell || (os.platform() === "win32" ? "powershell.exe" : "bash");
        // Configure options for the PTY.
        const options = {
            name: "xterm-color",
            cols: 80,
            rows: 24,
            cwd: process.env.HOME,
            env: process.env,
            // On Windows, setting useConpty to false if you encounter issues.
            useConpty: false,
        };

        // Spawn the terminal directly in the main process.
        const ptyProcess = spawn(shell, args || [], options);
        this.terminals[termId] = ptyProcess;
        this.terminalLogs[termId] = "";

        // Listen for data from the PTY process.
        ptyProcess.onData((data) => {
            // Append data to the terminal's log.
            this.terminalLogs[termId] += data;
            // Send data to the renderer process.
            BrowserWindow.getAllWindows()[0]?.webContents.send("command:output", termId, data);
        });

        return termId;
    }

    /**
     * Returns the logged output for a terminal.
     */
    getTerminalLogs = (terminalId: string) => {
        return this.terminalLogs[terminalId] || "";
    }

    /**
     * Sends a command to the terminal.
     */
    runCommand: RunCommand = (terminalId: string, command: string) => {
        const term = this.terminals[terminalId];
        if (term) {
            // Write the command to the terminal.
            term.write(command);
        }
    }

    /**
     * Resizes the terminal.
     */
    resizeTerminal: ResizeTerminal = (terminalId: string, cols: number, rows: number) => {
        const term = this.terminals[terminalId];
        if (term) {
            term.resize(cols, rows);
        }
    }

    /**
     * Kills the terminal and cleans up resources.
     */
    killTerminal: KillTerminal = (terminalId: string) => {
        const term = this.terminals[terminalId];
        if (term) {
            term.kill();
            delete this.terminals[terminalId];
            delete this.terminalLogs[terminalId];
            // Optionally, notify the renderer that the terminal has been killed.
            BrowserWindow.getAllWindows()[0]?.webContents.send("terminal:killed", terminalId);
            return true;
        }
        return false;
    }
}

export const electronTerminalService = new TerminalService();
