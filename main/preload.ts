import { contextBridge, ipcRenderer } from "electron";
import { GetUserDetails, Login, Logout } from "./types/auth-functions";
import { CreateFolder, FileNode, OpenFile } from "./types/file-functions";
import { CreateTerminal, GetCommandOutput, GetTerminalLogs, KillTerminal, ResizeTerminal, RunCommand } from "./types/terminal-functions";

export type FileSystemAPI = {
  createFolder: (params: {
    parentPath: string;
    folderName: string;
  }) => Promise<{
    success: boolean;
    error?: string;
  }>;
};

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the BrowserWindow");
}

try {
  contextBridge.exposeInMainWorld("context", {
    locale: navigator.language,
    // Auth IPC
    register: (...args: Parameters<Login>) =>
      ipcRenderer.invoke("user:register", ...args),
    login: (...args: Parameters<Login>) =>
      ipcRenderer.invoke("user:login", ...args),
    logout: (...args: Parameters<Logout>) =>
      ipcRenderer.invoke("user:logout", ...args),
    getDetails: (...args: Parameters<GetUserDetails>) =>
      ipcRenderer.invoke("user:get-details", ...args),
    // Terminal IPC
    createTerminal: (...args: Parameters<CreateTerminal>) => ipcRenderer.invoke("create:terminal", ...args),
    getTerminalLogs: (...args: Parameters<GetTerminalLogs>) => ipcRenderer.invoke("get:terminal:logs", ...args),
    runCommand: (...args: Parameters<RunCommand>) => ipcRenderer.send("run:command", ...args),
    resizeTerminal: (...args: Parameters<ResizeTerminal>) => ipcRenderer.send("resize:terminal", ...args),
    getCommandOutput: (cb: GetCommandOutput) => ipcRenderer.on('command:output', cb),
    removeListner: (cb: GetCommandOutput) => ipcRenderer.removeListener("command:output", cb),
    killTerminal: (...args: Parameters<KillTerminal>) => ipcRenderer.invoke("kill:terminal", ...args),
    
    // File System IPC
    createFile: (...args: any) => ipcRenderer.invoke("file:create", ...args),
    openFile: (...args: Parameters<OpenFile>) =>
      ipcRenderer.invoke("file:open", ...args),
    openFolder: (...args: any) => ipcRenderer.invoke("folder:open", ...args),
    createFolder: (...args: Parameters<CreateFolder>) => ipcRenderer.invoke("folder:create", ...args),
    deleteFolder: (
      path: string
    ): Promise<{
      success: boolean;
      message?: string;
      folderStructure?: FileNode[];
    }> => {
      return ipcRenderer.invoke("delete-folder", path);
    },

  });
} catch (error) {
  console.log(error);
}