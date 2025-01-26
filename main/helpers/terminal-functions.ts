import { spawn } from "child_process";
import { BrowserWindow } from "electron";

class TerminalService {
    run(mainWindow: BrowserWindow, command: string,): void {
        const [cmd, ...args] = command.split(" ");
        const process = spawn(cmd, args);
        console.log("Process spawned");
        // Stream stdout and stderr
        process.stdout.on("data", (chunk) => {
            console.log("Process is running", chunk.toString());
            mainWindow.webContents.send("command:output", { output: chunk.toString() });
        });

        process.stderr.on("data", (chunk) => {
            console.log("Process running", chunk.toString());
            mainWindow.webContents.send("command:output", { error: chunk.toString() });
        });

        // Handle process exit
        process.on("exit", (code) => {
            mainWindow.webContents.send("process:done", { code });
        });

        process.on("error", (err) => {
            console.log("Process error");
            mainWindow.webContents.send("command:output", { error: `${err.message}` });
        });

        console.log("Returning from run function");
    }
}

export const electronTerminalService = new TerminalService();
