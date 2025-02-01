import os from "os";
import { BrowserWindow } from "electron";
import { spawn } from "node-pty";
import { CreateTerminal, GetTerminalLogs, KillTerminal, ResizeTerminal, RunCommand } from "../types/terminal-functions";

class TerminalService {
    private terminals: Object;
    private terminalLogs: Object;
    constructor() {
        this.terminals = {};
        this.terminalLogs = {};
    }

    createTerminal: CreateTerminal = (termId, shell, args, options) => {
        console.log("Creating terinal with id: ", termId);
        shell = shell || (os.platform() === 'win32' ? 'cmd.exe' : 'bash');
        options = options || {
            name: 'xterm-color',
            cols: 80,
            rows: 24,
            cwd: process.env.HOME,
            env: process.env,
        };

        // Spawn the pty process.
        const ptyProcess = spawn(shell, args || [], options);
        this.terminals[termId] = ptyProcess;
        this.terminalLogs[termId] = "";

        ptyProcess.onData((data) => {
            this.terminalLogs[termId] += data;
            BrowserWindow.getAllWindows()[0]?.webContents.send('command:output', termId, data);
        });

        return termId;
    }

    getTerminalLogs: GetTerminalLogs = (terminalId: string) => {
        return this.terminalLogs[terminalId] || "";
    }

    runCommand: RunCommand = (terminalId: string, command: string) => {
        if (this.terminals[terminalId]) {
            this.terminals[terminalId].write(command);
        }
    }

    resizeTerminal: ResizeTerminal = (terminalId: string, cols: number, rows: number) => {
        if (this.terminals[terminalId]) {
            this.terminals[terminalId].resize(cols, rows);
        }
    }

    killTerminal: KillTerminal = (terminalId: string) => {
        if (this.terminals[terminalId]) {
            this.terminals[terminalId].kill();
            delete this.terminals[terminalId];
            delete this.terminalLogs[terminalId];
            return true;
        }
        return false;
    }
}

export const electronTerminalService = new TerminalService();
