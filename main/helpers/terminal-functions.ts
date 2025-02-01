import os from "os";
import { app, BrowserWindow } from "electron";
import { CreateTerminal, GetTerminalLogs, KillTerminal, ResizeTerminal, RunCommand } from "../types/terminal-functions";
import { ChildProcess, fork } from "child_process";
import path from "path";

interface TerminalMap {
    [termId: string]: ChildProcess;
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

    createTerminal: CreateTerminal = (termId, shell, args, rootPath) => {
        console.log("Creating terminal with id:", termId, rootPath);
        // Set default shell and options if needed.
        const ced = rootPath === null ? process.env.HOME : rootPath;
        shell = shell || (os.platform() === "win32" ? "powershell.exe" : "bash");
        const options = {
            name: "xterm-color",
            cols: 80,
            rows: 24,
            cwd: ced,
            env: process.env,
            useConpty: false,
        };
        console.log(options);
        const workerPath = process.env.NODE_ENV === "development"
            ? path.join(app.getAppPath(), "main", "helpers", "ptyworker.js")  // if in development your worker is in /main/helpers
            : path.join(app.getAppPath(), "ptyWorker.js");
        // Fork the worker process.
        const worker = fork(workerPath);

        // Store the worker and initialize log storage.
        this.terminals[termId] = worker;
        this.terminalLogs[termId] = "";

        // Listen for messages from the worker.
        worker.on("message", (msg: any) => {
            switch (msg.type) {
                case "data":
                    {
                        // Append received data to the terminal log.
                        this.terminalLogs[termId] += msg.data;
                        // Send output to the renderer.
                        BrowserWindow.getAllWindows()[0]?.webContents.send(
                            "command:output",
                            termId,
                            msg.data
                        );
                    }
                    break;
                case "killed":
                    {
                        // Optionally notify the renderer that this terminal is killed.
                        BrowserWindow.getAllWindows()[0]?.webContents.send(
                            "terminal:killed",
                            termId
                        );
                    }
                    break;
                default:
                    console.warn("Unknown message from pty worker:", msg);
            }
        });

        // Send an initialization message to the worker.
        worker.send({ type: "init", termId, shell, args, options });

        return termId;
    }

    getTerminalLogs = (terminalId: string) => {
        return this.terminalLogs[terminalId] || "";
    }

    runCommand: RunCommand = (terminalId: string, command: string) => {
        const worker = this.terminals[terminalId];
        if (worker) {
            worker.send({ type: "input", data: command });
        }
    }

    resizeTerminal: ResizeTerminal = (terminalId: string, cols: number, rows: number) => {
        const worker = this.terminals[terminalId];
        if (worker) {
            worker.send({ type: "resize", cols, rows });
        }
    }

    killTerminal: KillTerminal = (terminalId: string) => {
        const worker = this.terminals[terminalId];
        if (worker) {
            worker.send({ type: "kill", termId: terminalId });
            delete this.terminals[terminalId];
            delete this.terminalLogs[terminalId];
            return true;
        }
        return false;
    }
}

export const electronTerminalService = new TerminalService();
