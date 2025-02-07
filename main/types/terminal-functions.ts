export type CreateTerminal = (termId: string, shell: any, args: any, rootPath: string) => string;
export type GetTerminalLogs = (terminalId: string) => Promise<string>;
export type RunCommand = (termId: string, command: string) => void;
export type ResizeTerminal = (termId: string, cols: number, rows: number) => void;
export type GetCommandOutput = (event: any, incomingterminalId: string, data: string) => void;
export type KillTerminal = (termId: string) => boolean;