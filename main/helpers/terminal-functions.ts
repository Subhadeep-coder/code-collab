import { BrowserWindow } from "electron";
import { spawn, IPty } from "node-pty";
import os from "os";

class TerminalService {
    private ptyProcess: IPty;

    constructor() {
        const shell = os.platform() === "win32" ? "powershell.exe" : process.env.SHELL || "bash";
        this.ptyProcess = spawn(shell, [], {
            name: "xterm-color",
            cols: 80,
            rows: 30,
            cwd: process.cwd(),
            env: process.env,
        });

        this.setupListeners();
    }

    private setupListeners() {
        this.ptyProcess.onData((data: string) => {
            BrowserWindow.getAllWindows()[0]?.webContents.send("command:output", data);
        });

        this.ptyProcess.onExit(({ exitCode, signal }: { exitCode: number; signal?: number }) => {
            BrowserWindow.getAllWindows()[0]?.webContents.send("process:done", { code: exitCode });
        });
    }

    runCommand(input: string) {
        console.log(input);
        this.ptyProcess.write(input);
    }

    resize(cols: number, rows: number) {
        this.ptyProcess.resize(cols, rows);
    }
}

export const electronTerminalService = new TerminalService();
