import { GetCommandOutput } from "types/terminal-functions";

export class TerminalService {
    getTerminalLogs(terminalId: string, cb: (log: string) => void) {
        window.context.getTerminalLogs(terminalId).then(cb)
    }

    getCommandOutput(cb: GetCommandOutput) {
        window.context.getCommandOutput(cb);
    }

    runCommand(terminalId: string, data: any) {
        window.context.runCommand(terminalId, data);
    }

    resizeTerminal(terminalId: string, cols: number, rows: number) {
        window.context.resizeTerminal(terminalId, cols, rows);
    }

    removeListner(cb: GetCommandOutput) {
        window.context.removeListner(cb);
    }

    async createTerminal(id: string, shell: any, args: any, rootPath: string) {
        window.context.createTerminal(id, shell, shell, rootPath!);
    }

    killTerminal(id: string) {
        const result = window.context.killTerminal(id);
        return result;
    }
}

export const terminalService = new TerminalService();